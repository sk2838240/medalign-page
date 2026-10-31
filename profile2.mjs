import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info
const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}

// dark ink rows restricted to the wordmark horizontal band
console.log('--- row ink% in wordmark x-range 420..2300 ---')
for (let y = 1250; y < 1621; y += 10) {
  let ink = 0
  let total = 0
  for (let x = 420; x < 2300; x += 3) {
    const [R, G, B] = at(x, y)
    total++
    if (R + G + B < 300) ink++
  }
  const pct = ((ink / total) * 100).toFixed(2)
  console.log(`y=${y}: ${pct}% ${'#'.repeat(Math.round(Number(pct) * 1.5))}`)
}

// column ink% in the mark area (above wordmark)
console.log('\n--- column ink% in y 0..1300, every 40px ---')
for (let x = 0; x < W; x += 40) {
  let ink = 0
  let total = 0
  for (let y = 0; y < 1300; y += 3) {
    const [R, G, B] = at(x, y)
    total++
    if (R + G + B < 300) ink++
  }
  const pct = ((ink / total) * 100).toFixed(1)
  console.log(`x=${x}: ${pct}% ${'#'.repeat(Math.round(Number(pct) / 2))}`)
}
