import sharp from 'sharp'
import { stat } from 'node:fs/promises'

const src = 'public/medalign-logo.jpg'

// The source is a CMYK scan on a white matte. sharp's built-in CMYK handling
// does not match what a browser renders, so the Adobe conversion is applied
// here. Verified against Chrome's canvas output: brand royal lands on
// rgb(17,0,171) instead of the incorrect rgb(53,26,98).
const { data, info } = await sharp(src)
  .toColourspace('cmyk')
  .raw()
  .toBuffer({ resolveWithObject: true })
const { width: W, height: H, channels: C } = info

const clamp = (v) => (v < 0 ? 0 : v > 255 ? 255 : Math.round(v))
const rgb = new Uint8Array(W * H * 3)
for (let p = 0; p < W * H; p++) {
  const kf = 1 - data[p * C + 3] / 255
  rgb[p * 3] = clamp(255 * (1 - data[p * C] / 255) * kf)
  rgb[p * 3 + 1] = clamp(255 * (1 - data[p * C + 1] / 255) * kf)
  rgb[p * 3 + 2] = clamp(255 * (1 - data[p * C + 2] / 255) * kf)
}

const lumAt = (p) => 0.299 * rgb[p * 3] + 0.587 * rgb[p * 3 + 1] + 0.114 * rgb[p * 3 + 2]
const neutral = (p) =>
  Math.abs(rgb[p * 3] - rgb[p * 3 + 1]) <= 14 && Math.abs(rgb[p * 3 + 1] - rgb[p * 3 + 2]) <= 14

// Artwork mask: the white matte and the neutral grey artboard rules are
// dropped. Everything else is brand colour or the black wordmark.
const solid = new Uint8Array(W * H)
for (let p = 0; p < W * H; p++) {
  if (rgb[p * 3] > 240 && rgb[p * 3 + 1] > 240 && rgb[p * 3 + 2] > 240) continue
  if (neutral(p) && lumAt(p) >= 85) continue
  solid[p] = 255
}

// Coverage from a blurred mask gives clean antialiased edges without the
// translucent wash a naive distance-to-white alpha produces on the lighter
// teal areas of the emblem.
const coverage = await sharp(Buffer.from(solid), { raw: { width: W, height: H, channels: 1 } })
  .toColourspace('b-w')
  .blur(0.7)
  .raw()
  .toBuffer()

// Un-matte each pixel from the white background using its coverage.
const straight = new Uint8Array(W * H * 4)
for (let p = 0; p < W * H; p++) {
  const a = coverage[p]
  const af = a / 255
  const inv = 255 * (1 - af)
  straight[p * 4] = af > 0 ? clamp((rgb[p * 3] - inv) / af) : 0
  straight[p * 4 + 1] = af > 0 ? clamp((rgb[p * 3 + 1] - inv) / af) : 0
  straight[p * 4 + 2] = af > 0 ? clamp((rgb[p * 3 + 2] - inv) / af) : 0
  straight[p * 4 + 3] = a
}

// Separate the wordmark glyphs from the emblem artwork.
const alphaOnly = new Uint8Array(W * H)
for (let p = 0; p < W * H; p++) alphaOnly[p] = straight[p * 4 + 3]

const seen = new Uint8Array(W * H)
const stack = new Int32Array(W * H)
const comps = []
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const start = y * W + x
    if (!alphaOnly[start] || seen[start]) continue
    let sp = 0
    stack[sp++] = start
    seen[start] = 1
    let minX = x, maxX = x, minY = y, maxY = y, n = 0
    while (sp > 0) {
      const q = stack[--sp]
      const qx = q % W
      const qy = (q - qx) / W
      n++
      if (qx < minX) minX = qx
      if (qx > maxX) maxX = qx
      if (qy < minY) minY = qy
      if (qy > maxY) maxY = qy
      for (let dy = -1; dy <= 1; dy++) {
        const ny = qy + dy
        if (ny < 0 || ny >= H) continue
        for (let dx = -1; dx <= 1; dx++) {
          const nx = qx + dx
          if (nx < 0 || nx >= W) continue
          const r = ny * W + nx
          if (!alphaOnly[r] || seen[r]) continue
          seen[r] = 1
          stack[sp++] = r
        }
      }
    }
    if (n >= 2000) comps.push({ id: comps.length, minX, maxX, minY, maxY, n })
  }
}

const glyphs = comps.filter(
  (c) => c.minY >= 1340 && c.maxY <= 1560 && c.maxY - c.minY <= 220 && c.n <= 60000,
)
const glyphSet = new Set(glyphs)
console.log(`wordmark glyphs found: ${glyphs.length}`)

const WORDMARK_TOP = 1350
let ex0 = W, ey0 = H, ex1 = 0, ey1 = 0
for (const c of comps) {
  if (glyphSet.has(c)) continue
  if (c.n < 3000) continue
  if (c.minX < ex0) ex0 = c.minX
  if (c.maxX > ex1) ex1 = c.maxX
  if (c.minY < ey0) ey0 = c.minY
  if (c.maxY > ey1) ey1 = c.maxY
}
ey1 = Math.min(ey1, WORDMARK_TOP)

let wx0 = W, wy0 = H, wx1 = 0, wy1 = 0
for (const g of glyphs) {
  if (g.minX < wx0) wx0 = g.minX
  if (g.maxX > wx1) wx1 = g.maxX
  if (g.minY < wy0) wy0 = g.minY
  if (g.maxY > wy1) wy1 = g.maxY
}

console.log(
  `emblem bbox x ${ex0}..${ex1} y ${ey0}..${ey1} (w=${ex1 - ex0 + 1} h=${ey1 - ey0 + 1} aspect=${((ex1 - ex0 + 1) / (ey1 - ey0 + 1)).toFixed(2)})`,
)
console.log(
  `wordmark bbox x ${wx0}..${wx1} y ${wy0}..${wy1} (w=${wx1 - wx0 + 1} h=${wy1 - wy0 + 1} aspect=${((wx1 - wx0 + 1) / (wy1 - wy0 + 1)).toFixed(2)}) from ${glyphs.length} glyphs`,
)

// Split the straight-alpha image into an emblem layer and a wordmark layer.
const emblemLayer = Buffer.alloc(W * H * 4)
const wordLayer = Buffer.alloc(W * H * 4)
for (let p = 0; p < W * H; p++) {
  const x = p % W
  const y = (p - x) / W
  const inWord = x >= wx0 && x <= wx1 && y >= wy0 && y <= wy1
  const target = inWord ? wordLayer : emblemLayer
  const s = p * 4
  target[s] = straight[s]
  target[s + 1] = straight[s + 1]
  target[s + 2] = straight[s + 2]
  target[s + 3] = straight[s + 3]
}

function crop(layer, x0, y0, x1, y1) {
  const w = x1 - x0 + 1
  const h = y1 - y0 + 1
  const out = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const s = ((y + y0) * W + (x + x0)) * 4
      const d = (y * w + x) * 4
      out[d] = layer[s]
      out[d + 1] = layer[s + 1]
      out[d + 2] = layer[s + 2]
      out[d + 3] = layer[s + 3]
    }
  }
  return { buf: out, w, h }
}

function resize(img, targetH) {
  const scale = targetH / img.h
  const w = Math.max(1, Math.round(img.w * scale))
  const h = targetH
  const out = Buffer.alloc(w * h * 4)
  for (let y = 0; y < h; y++) {
    const sy = Math.min(img.h - 1, Math.floor((y + 0.5) / scale))
    for (let x = 0; x < w; x++) {
      const sx = Math.min(img.w - 1, Math.floor((x + 0.5) / scale))
      const s = (sy * img.w + sx) * 4
      const d = (y * w + x) * 4
      out[d] = img.buf[s]
      out[d + 1] = img.buf[s + 1]
      out[d + 2] = img.buf[s + 2]
      out[d + 3] = img.buf[s + 3]
    }
  }
  return { buf: out, w, h }
}

// Horizontal lockup: emblem left, wordmark right, optically centred.
const EMBLEM_H = 96
const WORD_H = 40
const GAP = 18

const emblemImg = resize(crop(emblemLayer, ex0, ey0, ex1, ey1), EMBLEM_H)
const wordImg = resize(crop(wordLayer, wx0, wy0, wx1, wy1), WORD_H)

const canvasW = emblemImg.w + GAP + wordImg.w
const canvasH = EMBLEM_H

function composite(white) {
  const out = Buffer.alloc(canvasW * canvasH * 4)
  const put = (img, left, top) => {
    for (let y = 0; y < img.h; y++) {
      const dy = top + y
      if (dy < 0 || dy >= canvasH) continue
      for (let x = 0; x < img.w; x++) {
        const s = (y * img.w + x) * 4
        const d = (dy * canvasW + left + x) * 4
        const a = img.buf[s + 3]
        if (a === 0) continue
        const r = white ? 255 : img.buf[s]
        const g = white ? 255 : img.buf[s + 1]
        const b = white ? 255 : img.buf[s + 2]
        const af = a / 255
        out[d] = Math.round(r * af + out[d] * (1 - af))
        out[d + 1] = Math.round(g * af + out[d + 1] * (1 - af))
        out[d + 2] = Math.round(b * af + out[d + 2] * (1 - af))
        out[d + 3] = Math.min(255, a + Math.round(out[d + 3] * (1 - af)))
      }
    }
  }
  put(emblemImg, 0, Math.round((canvasH - emblemImg.h) / 2))
  put(wordImg, emblemImg.w + GAP, Math.round((canvasH - wordImg.h) / 2))
  return out
}

for (const [file, white] of [
  ['public/medalign-logo.png', false],
  ['public/medalign-logo-light.png', true],
]) {
  await sharp(composite(white), { raw: { width: canvasW, height: canvasH, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(file)
  const m = await sharp(file).metadata()
  const { size } = await stat(file)
  console.log(`${file}: ${m.width}x${m.height} (aspect ${(m.width / m.height).toFixed(2)}) ${size} B`)
}
