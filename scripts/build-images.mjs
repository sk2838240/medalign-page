import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const MANIFEST_PATH = join(ROOT, 'scripts', 'images.manifest.json')
const ASSETS_DIR = join(ROOT, 'src', 'assets', 'images')
const PUBLIC_DIR = join(ROOT, 'public')
const CACHE_DIR = join(ROOT, '.cache', 'source')

const toBytes = (kb) => kb * 1024

const fetchBuffer = async (url) => {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
    },
  })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

const download = async (entry, name) => {
  const cached = join(CACHE_DIR, `${name}.jpg`)
  try {
    const info = await stat(cached)
    if (info.size > 0) {
      return { buffer: await readFile(cached), fromCache: true }
    }
  } catch {
    // no cached copy
  }

  const attempts = [entry.src, entry.fallback].filter(Boolean)
  let lastError = null
  for (const url of attempts) {
    try {
      const buffer = await fetchBuffer(url)
      await mkdir(dirname(cached), { recursive: true })
      await writeFile(cached, buffer)
      return { buffer, fromCache: false }
    } catch (err) {
      lastError = err
    }
  }
  throw new Error(`could not download ${name}: ${lastError?.message ?? 'no source url'}`)
}

const buildOgCard = async (outPath) => {
  const width = 1200
  const height = 630

  const background = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1200AC"/>
          <stop offset="45%" stop-color="#415BAB"/>
          <stop offset="70%" stop-color="#589BBA"/>
          <stop offset="100%" stop-color="#84FEC5"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#brand)"/>
    </svg>`,
  )

  const markPath = join(PUBLIC_DIR, 'medalign-mark.png')
  const wordmarkPath = join(PUBLIC_DIR, 'medalign-wordmark-light.png')

  const markMeta = await sharp(markPath).metadata()
  const markWidth = 168
  const markHeight = Math.round((markMeta.height / markMeta.width) * markWidth)

  const wordmarkMeta = await sharp(wordmarkPath).metadata()
  const wordmarkWidth = 560
  const wordmarkHeight = Math.round((wordmarkMeta.height / wordmarkMeta.width) * wordmarkWidth)

  const mark = await sharp(markPath)
    .resize({ width: markWidth, height: markHeight, fit: 'contain' })
    .png()
    .toBuffer()

  const wordmark = await sharp(wordmarkPath)
    .resize({ width: wordmarkWidth, height: wordmarkHeight, fit: 'contain' })
    .png()
    .toBuffer()

  const stackTop = Math.round(height / 2 - (markHeight + 40 + wordmarkHeight) / 2)

  await sharp(background)
    .composite([
      { input: mark, left: Math.round((width - markWidth) / 2), top: stackTop },
      {
        input: wordmark,
        left: Math.round((width - wordmarkWidth) / 2),
        top: stackTop + markHeight + 40,
      },
    ])
    .jpeg({ quality: 88, progressive: true })
    .toFile(outPath)
}

const manifest = JSON.parse(await readFile(MANIFEST_PATH, 'utf8'))
const entries = Object.entries(manifest)

await mkdir(ASSETS_DIR, { recursive: true })
await mkdir(PUBLIC_DIR, { recursive: true })

const generated = []
const rows = []

for (const [name, entry] of entries) {
  const { buffer, fromCache } = await download(entry, name)

  const outPath = join(ASSETS_DIR, `${name}.webp`)
  const pipeline = sharp(buffer).resize({
    width: entry.width,
    height: entry.height,
    fit: 'cover',
    position: sharp.strategy.attention,
  })

  await pipeline.webp({ quality: entry.quality, effort: 5 }).toFile(outPath)

  const { size } = await stat(outPath)
  const maxBytes = entry.maxBytes ?? toBytes(100)
  const withinBudget = size <= maxBytes

  rows.push({
    name,
    file: `${name}.webp`,
    dims: `${entry.width}x${entry.height}`,
    bytes: size,
    maxBytes,
    withinBudget,
    cached: fromCache,
    credit: entry.credit,
  })

  generated.push({ name, entry })

  console.log(
    `${withinBudget ? 'ok  ' : 'OVER'} ${name.padEnd(24)} ${String(entry.width).padStart(4)}x${String(entry.height).padEnd(4)}  ${String(size).padStart(7)} B / ${String(maxBytes).padStart(7)} B  ${fromCache ? '(cached)' : ''}`,
  )
}

const ogPath = join(PUBLIC_DIR, 'og-image.jpg')
await buildOgCard(ogPath)
const ogStat = await stat(ogPath)
rows.push({
  name: 'ogImage',
  file: 'public/og-image.jpg',
  dims: '1200x630',
  bytes: ogStat.size,
  maxBytes: toBytes(200),
  withinBudget: ogStat.size <= toBytes(200),
  cached: false,
  credit: 'Composed from MedAlign brand assets',
})
console.log(
  `${rows.at(-1).withinBudget ? 'ok  ' : 'OVER'} ogImage                 1200x630  ${String(ogStat.size).padStart(7)} B / ${String(toBytes(200)).padStart(7)} B`,
)

const imports = generated
  .map(({ name }) => `import ${name} from './${name}.webp'`)
  .join('\n')
const entriesTs = generated
  .map(
    ({ name, entry }) =>
      `  ${name}: { src: ${name}, width: ${entry.width}, height: ${entry.height}, alt: ${JSON.stringify(entry.alt)} },`,
  )
  .join('\n')

const indexSource = `// Generated by scripts/build-images.mjs. Do not edit by hand.
${imports}

export const siteImages = {
${entriesTs}
} as const

export type SiteImageKey = keyof typeof siteImages
export type SiteImage = (typeof siteImages)[SiteImageKey]
`

await writeFile(join(ASSETS_DIR, 'index.ts'), indexSource)

console.log('\nwrote src/assets/images/index.ts')
console.log('\ncredits:')
for (const row of rows) {
  console.log(`  ${row.name}: ${row.credit}`)
}

const overBudget = rows.filter((r) => !r.withinBudget)
if (overBudget.length > 0) {
  console.error(
    `\n${overBudget.length} image(s) over budget: ${overBudget.map((r) => `${r.name} (${r.bytes} > ${r.maxBytes})`).join(', ')}`,
  )
  process.exit(1)
}

console.log(`\nall ${rows.length} images within budget`)
