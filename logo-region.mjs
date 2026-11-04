import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info

const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}
const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b

const [x0, y0, x1, y1] = process.argv.slice(2, 6).map(Number)
const cols = Number(process.argv[6] || 60)
const rows = Number(process.argv[7] || 40)

const alphaAt = (x, y) => {
  const [R, G, B] = at(x, y)
  return Math.max(0, Math.min(255, Math.round(((235 - lum(R, G, B)) * 255) / 175)))
}

// tight content bbox inside the requested region
let bx0 = x1, bx1 = x0, by0 = y1, by1 = y0
for (let y = y0; y < y1; y++) {
  for (let x = x0; x < x1; x++) {
    if (alphaAt(x, y) < 40) continue
    if (x < bx0) bx0 = x
    if (x > bx1) bx1 = x
    if (y < by0) by0 = y
    if (y > by1) by1 = y
  }
}
console.log(`region x ${x0}..${x1} y ${y0}..${y1} -> content bbox x ${bx0}..${bx1} (w ${bx1 - bx0 + 1}) y ${by0}..${by1} (h ${by1 - by0 + 1})`)

const cw = (bx1 - bx0 + 1) / cols
const ch = (by1 - by0 + 1) / rows
for (let r = 0; r < rows; r++) {
  let line = ''
  for (let c = 0; c < cols; c++) {
    let a = 0
    let total = 0
    for (let y = Math.floor(by0 + r * ch); y < Math.floor(by0 + (r + 1) * ch); y += 2) {
      for (let x = Math.floor(bx0 + c * cw); x < Math.floor(bx0 + (c + 1) * cw); x += 2) {
        a += alphaAt(x, y)
        total++
      }
    }
    const ratio = a / total / 255
    line += ratio > 0.55 ? '#' : ratio > 0.25 ? '+' : ratio > 0.08 ? '.' : ' '
  }
  console.log(line)
}
