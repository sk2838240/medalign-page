import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const meta = await sharp(src).metadata()
console.log('meta:', meta.width, 'x', meta.height, meta.format)

const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info

const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}

const classify = (r, g, b) => {
  if (r > 235 && g > 235 && b > 235) return 'W'
  if (r >= 55 && r <= 95 && g >= 25 && g <= 65 && b >= 65 && b <= 110) return 'P' // purple #452A58
  if (r >= 95 && r <= 150 && g >= 120 && g <= 180 && b >= 135 && b <= 190) return 'T' // teal/steel
  if (r + g + b < 170) return 'D' // dark
  if (r >= 135 && r <= 180 && g >= 135 && g <= 180 && b >= 135 && b <= 180) return 'G' // gray frame
  return '.'
}

const cols = 150
const rows = 46
const cw = W / cols
const ch = H / rows
const map = []
for (let r = 0; r < rows; r++) {
  let line = ''
  for (let c = 0; c < cols; c++) {
    const counts = { W: 0, P: 0, T: 0, D: 0, G: 0, '.': 0 }
    let total = 0
    for (let y = Math.floor(r * ch); y < Math.floor((r + 1) * ch); y += 3) {
      for (let x = Math.floor(c * cw); x < Math.floor((c + 1) * cw); x += 3) {
        const [R, G, B] = at(x, y)
        counts[classify(R, G, B)]++
        total++
      }
    }
    const best = Object.entries(counts)
      .filter(([k]) => k !== 'W')
      .sort((a, b) => b[1] - a[1])[0]
    if (counts.W / total > 0.85) line += ' '
    else if (best[1] / total > 0.3) line += best[0]
    else line += '.'
  }
  map.push(line)
}
console.log('\n--- color map (P=purple T=teal D=dark G=gray .=mixed) ---')
map.forEach((l, i) => console.log(String(i).padStart(2), l))

// bounding box of non-white content
let minX = W
let maxX = 0
let minY = H
let maxY = 0
for (let y = 0; y < H; y += 2) {
  for (let x = 0; x < W; x += 2) {
    const [R, G, B] = at(x, y)
    if (!(R > 235 && G > 235 && B > 235)) {
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
}
console.log(`\ncontent bbox: x ${minX}..${maxX} (${maxX - minX}px)  y ${minY}..${maxY} (${maxY - minY}px)`)

// row ink profile to locate text band vs graphic
console.log('\n--- row ink % (48 bands, full width) ---')
for (let r = 0; r < 48; r++) {
  const y0 = Math.floor((r * H) / 48)
  const y1 = Math.floor(((r + 1) * H) / 48)
  let ink = 0
  let total = 0
  for (let y = y0; y < y1; y += 4) {
    for (let x = 0; x < W; x += 8) {
      const [R, G, B] = at(x, y)
      total++
      if (!(R > 235 && G > 235 && B > 235)) ink++
    }
  }
  const pct = ((ink / total) * 100).toFixed(1)
  console.log(
    String(r).padStart(2),
    `y${String(y0).padStart(5)}-${String(y1).padStart(5)}`,
    `${pct.padStart(5)}%`,
    '#'.repeat(Math.round(Number(pct) * 0.6)),
  )
}
