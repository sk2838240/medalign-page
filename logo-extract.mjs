import sharp from 'sharp'

const src = 'public/medalign-logo.jpg'
const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info

const at = (x, y) => {
  const i = (y * W + x) * C
  return [data[i], data[i + 1], data[i + 2]]
}

const lum = (r, g, b) => 0.299 * r + 0.587 * g + 0.114 * b

// Tight bounds of the lettering: dark pixels only, right of the swoosh tail.
let wx0 = W, wx1 = 0, wy0 = H, wy1 = 0
for (let y = 1320; y < 1585; y++) {
  for (let x = 420; x < 3000; x++) {
    const [R, G, B] = at(x, y)
    if (lum(R, G, B) > 120) continue
    if (x < wx0) wx0 = x
    if (x > wx1) wx1 = x
    if (y < wy0) wy0 = y
    if (y > wy1) wy1 = y
  }
}
console.log(`wordmark bbox: x ${wx0}..${wx1} (w ${wx1 - wx0 + 1}) y ${wy0}..${wy1} (h ${wy1 - wy0 + 1})`)

for (const [name, x0, x1] of [
  ['M', wx0, wx0 + 200],
  ['e', wx0 + 380, wx0 + 560],
  ['d', wx0 + 690, wx0 + 880],
  ['A', wx0 + 990, wx0 + 1180],
  ['l', wx0 + 1340, wx0 + 1470],
  ['i', wx0 + 1630, wx0 + 1680],
  ['g', wx0 + 1810, wx0 + 2010],
  ['n', wx0 + 2160, wx0 + 2340],
]) {
  let r = 0, g = 0, b = 0, n = 0
  for (let y = wy0; y <= wy1; y++) {
    for (let x = x0; x <= Math.min(x1, wx1); x++) {
      const [R, G, B] = at(x, y)
      if (lum(R, G, B) > 60) continue
      r += R; g += G; b += B; n++
    }
  }
  console.log(`  letter ${name}: rgb(${n ? Math.round(r / n) : 0},${n ? Math.round(g / n) : 0},${n ? Math.round(b / n) : 0})`)
}

const pad = 10
const left = wx0 - pad
const top = wy0 - pad
const w = wx1 - wx0 + 1 + pad * 2
const h = wy1 - wy0 + 1 + pad * 2

const crop = await sharp(src).extract({ left, top, width: w, height: h }).raw().toBuffer({ resolveWithObject: true })
const { data: cd, info: ci } = crop

const build = (light) => {
  const rgba = Buffer.alloc(ci.width * ci.height * 4)
  for (let i = 0, p = 0; i < cd.length; i += ci.channels, p += 4) {
    const R = cd[i], G = cd[i + 1], B = cd[i + 2]
    const l = lum(R, G, B)
    let alpha = ((235 - l) * 255) / 175
    alpha = Math.max(0, Math.min(255, Math.round(alpha)))
    if (light) {
      rgba[p] = 255
      rgba[p + 1] = 255
      rgba[p + 2] = 255
    } else {
      const a = alpha / 255
      rgba[p] = a > 0 ? Math.max(0, Math.min(255, Math.round((R - 255 * (1 - a)) / a))) : 0
      rgba[p + 1] = a > 0 ? Math.max(0, Math.min(255, Math.round((G - 255 * (1 - a)) / a))) : 0
      rgba[p + 2] = a > 0 ? Math.max(0, Math.min(255, Math.round((B - 255 * (1 - a)) / a))) : 0
    }
    rgba[p + 3] = alpha
  }
  return sharp(rgba, { raw: { width: ci.width, height: ci.height, channels: 4 } })
}

const targetHeight = 96
const out = await build(false)
  .resize({ height: targetHeight, fit: 'inside' })
  .png({ compressionLevel: 9 })
  .toBuffer()
await sharp(out).toFile('public/medalign-wordmark.png')

const outLight = await build(true)
  .resize({ height: targetHeight, fit: 'inside' })
  .png({ compressionLevel: 9 })
  .toBuffer()
await sharp(outLight).toFile('public/medalign-wordmark-light.png')

const meta = await sharp('public/medalign-wordmark.png').metadata()
console.log(`\nmedalign-wordmark.png: ${meta.width}x${meta.height}`)
const metaL = await sharp('public/medalign-wordmark-light.png').metadata()
console.log(`medalign-wordmark-light.png: ${metaL.width}x${metaL.height}`)
