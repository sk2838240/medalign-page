import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const ASSETS = join(process.cwd(), 'src', 'assets', 'images')
const files = (await readdir(ASSETS)).filter((f) => f.endsWith('.webp')).sort()

let total = 0
for (const file of files) {
  const path = join(ASSETS, file)
  const meta = await sharp(path).metadata()
  const { size } = await stat(path)
  total += size
  const ok = meta.format === 'webp' && meta.width > 0 && meta.height > 0
  console.log(
    `${ok ? 'ok  ' : 'BAD '} ${file.padEnd(30)} ${meta.format} ${meta.width}x${meta.height} ${String(size).padStart(7)} B`,
  )
}

const og = await sharp(join(process.cwd(), 'public', 'og-image.jpg')).metadata()
console.log(`ok   og-image.jpg                    ${og.format} ${og.width}x${og.height}`)

console.log(`\ntotal webp weight: ${(total / 1024).toFixed(1)} KB across ${files.length} images`)

const distAssets = join(process.cwd(), 'dist', 'assets')
const distFiles = await readdir(distAssets)
console.log(`dist emitted ${distFiles.filter((f) => f.endsWith('.webp')).length} webp files`)
