import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}

const isPurple = (r, g, b) => r >= 50 && r <= 105 && g >= 15 && g <= 70 && b >= 55 && b <= 120 && b > g + 20 && r > g + 10

const [x0, y0, x1, y1] = process.argv.slice(2, 6).map(Number)
const cols = Number(process.argv[6] || 50)
const rows = Number(process.argv[7] || 40)

let bx0 = x1, bx1 = x0, by0 = y1, by1 = y0
for (let y = y0; y < y1; y++) {
  for (let x = x0; x < x1; x++) {
    const [R, G, B] = at(x, y)
    if (!isPurple(R, G, B)) continue
    if (x < bx0) bx0 = x
    if (x > bx1) bx1 = x
    if (y < by0) by0 = y
    if (y > by1) by1 = y
  }
}
console.log(`purple bbox in region: x ${bx0}..${bx1} (w ${bx1 - bx0 + 1}) y ${by0}..${by1} (h ${by1 - by0 + 1})`)

const cw = (bx1 - bx0 + 1) / cols
const ch = (by1 - by0 + 1) / rows
for (let r = 0; r < rows; r++) {
  let line = ''
  for (let c = 0; c < cols; c++) {
    let n = 0
    let total = 0
    for (let y = Math.floor(by0 + r * ch); y < Math.floor(by0 + (r + 1) * ch); y += 2) {
      for (let x = Math.floor(bx0 + c * cw); x < Math.floor(bx0 + (c + 1) * cw); x += 2) {
        const [R, G, B] = at(x, y)
        total++
        if (isPurple(R, G, B)) n++
      }
    }
    const ratio = n / total
    line += ratio > 0.6 ? 'P' : ratio > 0.25 ? '+' : ratio > 0.08 ? '.' : ' '
  }
  console.log(line)
}
