import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}
const isInk = (r, g, b) => !(r > 235 && g > 235 && b > 235)
const isGray = (r, g, b) => r >= 135 && r <= 185 && g >= 135 && g <= 185 && b >= 135 && b <= 185

const y0 = Number(process.argv[2] ?? 0)
const y1 = Number(process.argv[3] ?? H)
const x0 = Number(process.argv[4] ?? 0)
const x1 = Number(process.argv[5] ?? W)

console.log(`region x ${x0}..${x1}  y ${y0}..${y1}`)

// column ink profile -> find gaps (separate elements)
console.log('\n--- column ink % (100 buckets) ---')
const buckets = 100
const cw = (x1 - x0) / buckets
let prevInk = -1
for (let c = 0; c < buckets; c++) {
  let ink = 0
  let total = 0
  let gray = 0
  for (let y = y0; y < y1; y += 3) {
    for (let x = Math.floor(x0 + c * cw); x < Math.floor(x0 + (c + 1) * cw); x += 3) {
      const [R, G, B] = at(x, y)
      total++
      if (isInk(R, G, B)) ink++
      if (isGray(R, G, B)) gray++
    }
  }
  const pct = ((ink / total) * 100).toFixed(1)
  const g = ((gray / total) * 100).toFixed(1)
  const flag = Number(pct) < 1 ? ' <-- gap' : ''
  console.log(
    String(c).padStart(3),
    `x${String(Math.floor(x0 + c * cw)).padStart(5)}`,
    `${pct.padStart(5)}% ink  gray ${g.padStart(5)}%${flag}`,
  )
}
