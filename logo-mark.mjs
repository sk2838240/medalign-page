import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}

const isPurple = (r, g, b) =>
  r >= 48 && r <= 108 && g >= 12 && g <= 72 && b >= 52 && b <= 122 && b > g + 18 && r > g + 8

const RX0 = 800
const RX1 = 1420
const RY0 = 560
const RY1 = 1140

// strict purple mask over the region
const strict = new Uint8Array((RX1 - RX0) * (RY1 - RY0))
const colCount = new Array(RX1 - RX0).fill(0)
for (let y = RY0; y < RY1; y++) {
  for (let x = RX0; x < RX1; x++) {
    const [R, G, B] = at(x, y)
    if (!isPurple(R, G, B)) continue
    strict[(y - RY0) * (RX1 - RX0) + (x - RX0)] = 1
    colCount[x - RX0]++
  }
}
const colMin = Math.max(...colCount.map((c) => c))
let c0 = 0
while (c0 < colCount.length && colCount[c0] < colMin * 0.08) c0++
let c1 = colCount.length - 1
while (c1 > c0 && colCount[c1] < colMin * 0.08) c1--
const rowCount = new Array(RY1 - RY0).fill(0)
for (let y = RY0; y < RY1; y++) {
  for (let x = RX0 + c0; x <= RX0 + c1; x++) {
    if (strict[(y - RY0) * (RX1 - RX0) + (x - RX0)]) rowCount[y - RY0]++
  }
}
const rowMin = Math.max(...rowCount)
let r0 = 0
while (r0 < rowCount.length && rowCount[r0] < rowMin * 0.08) r0++
let r1 = rowCount.length - 1
while (r1 > r0 && rowCount[r1] < rowMin * 0.08) r1--

const bx0 = RX0 + c0
const bx1 = RX0 + c1
const by0 = RY0 + r0
const by1 = RY0 + r1
console.log(`leaf bbox: x ${bx0}..${bx1} (w ${bx1 - bx0 + 1}) y ${by0}..${by1} (h ${by1 - by0 + 1})`)

const pad = 6
const left = bx0 - pad
const top = by0 - pad
const w = bx1 - bx0 + 1 + pad * 2
const h = by1 - by0 + 1 + pad * 2

// hard purple mask -> blurred for soft edges
const mask = Buffer.alloc(w * h)
for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const [R, G, B] = at(left + x, top + y)
    mask[y * w + x] = isPurple(R, G, B) ? 255 : 0
  }
}
const alphaBuf = await sharp(mask, { raw: { width: w, height: h, channels: 1 } })
  .blur(1.2)
  .raw()
  .toBuffer()

const crop = await sharp(src).extract({ left, top, width: w, height: h }).raw().toBuffer({ resolveWithObject: true })
const { data: cd, info: ci } = crop

const rgba = Buffer.alloc(w * h * 4)
for (let p = 0; p < w * h; p++) {
  const a = alphaBuf[p] / 255
  const R = cd[p * ci.channels]
  const G = cd[p * ci.channels + 1]
  const B = cd[p * ci.channels + 2]
  const un = (c) => Math.max(0, Math.min(255, Math.round(a > 0 ? (c - 255 * (1 - a)) / a : 0)))
  rgba[p * 4] = un(R)
  rgba[p * 4 + 1] = un(G)
  rgba[p * 4 + 2] = un(B)
  rgba[p * 4 + 3] = alphaBuf[p]
}

const out = await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
  .resize({ width: 256, height: 256, fit: 'inside' })
  .png({ compressionLevel: 9 })
  .toBuffer()

await sharp(out).toFile('public/medalign-mark.png')
const m = await sharp('public/medalign-mark.png').metadata()
console.log(`medalign-mark.png: ${m.width}x${m.height}`)

// ASCII verification
const { data: vd, info: vi } = await sharp('public/medalign-mark.png').raw().toBuffer({ resolveWithObject: true })
const cols = 44
const rows = 22
const cw = vi.width / cols
const chh = vi.height / rows
for (let r = 0; r < rows; r++) {
  let line = ''
  for (let c = 0; c < cols; c++) {
    let a = 0
    let total = 0
    for (let y = Math.floor(r * chh); y < Math.floor((r + 1) * chh); y++) {
      for (let x = Math.floor(c * cw); x < Math.floor((c + 1) * cw); x++) {
        a += vd[(y * vi.width + x) * vi.channels + 3]
        total++
      }
    }
    const ratio = a / total / 255
    line += ratio > 0.6 ? '#' : ratio > 0.25 ? '+' : ratio > 0.08 ? '.' : ' '
  }
  console.log(line)
}
