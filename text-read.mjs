import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}

const x0 = Number(process.argv[2])
const x1 = Number(process.argv[3])
const y0 = Number(process.argv[4])
const y1 = Number(process.argv[5])
const cols = Number(process.argv[6] || 150)
const rows = Number(process.argv[7] || 34)

const cw = (x1 - x0) / cols
const ch = (y1 - y0) / rows
console.log(`--- dark-ink only: x ${x0}..${x1} y ${y0}..${y1} (${cols}x${rows}) ---`)
for (let r = 0; r < rows; r++) {
  let line = ''
  for (let c = 0; c < cols; c++) {
    let ink = 0
    let total = 0
    for (let y = Math.floor(y0 + r * ch); y < Math.floor(y0 + (r + 1) * ch); y += 1) {
      for (let x = Math.floor(x0 + c * cw); x < Math.floor(x0 + (c + 1) * cw); x += 1) {
        const [R, G, B] = at(x, y)
        total++
        // only very dark ink, ignore the light gray frame
        if (R + G + B < 260) ink++
      }
    }
    const ratio = ink / total
    line += ratio > 0.45 ? '#' : ratio > 0.25 ? '*' : ratio > 0.08 ? '+' : ratio > 0.02 ? '.' : ' '
  }
  console.log(line)
}
