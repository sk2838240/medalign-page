import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}

const classify = (r, g, b) => {
  if (r > 235 && g > 235 && b > 235) return ' '
  if (r >= 55 && r <= 95 && g >= 25 && g <= 65 && b >= 65 && b <= 110) return 'P'
  if (r >= 95 && r <= 150 && g >= 120 && g <= 180 && b >= 135 && b <= 190) return 'T'
  if (r + g + b < 170) return '#'
  if (r >= 135 && r <= 180 && g >= 135 && g <= 180 && b >= 135 && b <= 180) return 'G'
  return '.'
}

const region = process.argv[2]
const rx0 = Number(process.argv[3])
const ry0 = Number(process.argv[4])
const rx1 = Number(process.argv[5])
const ry1 = Number(process.argv[6])
const cols = Number(process.argv[7] || 100)
const rows = Number(process.argv[8] || 50)

const cw = (rx1 - rx0) / cols
const ch = (ry1 - ry0) / rows
console.log(`--- ${region}: x ${rx0}..${rx1}  y ${ry0}..${ry1} (${cols}x${rows}) ---`)
for (let r = 0; r < rows; r++) {
  let line = ''
  for (let c = 0; c < cols; c++) {
    const counts = { P: 0, T: 0, '#': 0, G: 0, '.': 0, ' ': 0 }
    let total = 0
    for (let y = Math.floor(ry0 + r * ch); y < Math.floor(ry0 + (r + 1) * ch); y += 2) {
      for (let x = Math.floor(rx0 + c * cw); x < Math.floor(rx0 + (c + 1) * cw); x += 2) {
        const [R, G, B] = at(x, y)
        counts[classify(R, G, B)]++
        total++
      }
    }
    const best = Object.entries(counts)
      .filter(([k]) => k !== ' ')
      .sort((a, b) => b[1] - a[1])[0]
    if (counts[' '] / total > 0.82) line += ' '
    else if (best[1] / total > 0.28) line += best[0]
    else line += '.'
  }
  console.log(line)
}
