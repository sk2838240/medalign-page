import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const URL_UNDER_TEST = process.argv[2] ?? 'http://localhost:5173/'
const PORT = 9224

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  '--user-data-dir=C:\\Users\\gkuma\\AppData\\Local\\Temp\\kilo\\chrome-medalign2',
  'about:blank',
])

const getWsUrl = async () => {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`)
      const json = await res.json()
      if (json.webSocketDebuggerUrl) return json.webSocketDebuggerUrl
    } catch {
      await sleep(250)
    }
  }
  throw new Error('no debugger endpoint')
}

const ws = new WebSocket(await getWsUrl())
await new Promise((resolve, reject) => {
  ws.addEventListener('open', resolve, { once: true })
  ws.addEventListener('error', reject, { once: true })
})

let nextId = 0
const pending = new Map()
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    if (msg.error) reject(new Error(JSON.stringify(msg.error)))
    else resolve(msg.result)
  }
})
const send = (method, params = {}, sessionId) =>
  new Promise((resolve, reject) => {
    const id = ++nextId
    pending.set(id, { resolve, reject })
    ws.send(JSON.stringify({ id, method, params, sessionId }))
  })

const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true })
const cmd = (method, params) => send(method, params, sessionId)
await cmd('Page.enable')
await cmd('Runtime.enable')

const evaluate = async (expression) => {
  const r = await cmd('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text)
  return r.result.value
}

const viewports = [
  { name: 'desktop', width: 1440, height: 900, mobile: false },
  { name: 'mobile', width: 390, height: 844, mobile: true },
]

for (const vp of viewports) {
  await cmd('Emulation.setDeviceMetricsOverride', {
    width: vp.width,
    height: vp.height,
    deviceScaleFactor: 1,
    mobile: vp.mobile,
  })
  await cmd('Page.navigate', { url: URL_UNDER_TEST })
  await sleep(2500)

  // scroll through the whole page to trigger every lazy image
  await evaluate(`(async () => {
    const step = window.innerHeight / 2
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
    await new Promise((r) => setTimeout(r, 800))
    return true
  })()`)
  await sleep(1500)

  const report = await evaluate(`(() => {
    const doc = document.documentElement
    const vw = doc.clientWidth
    const offenders = []
    for (const el of document.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect()
      if (r.width === 0 && r.height === 0) continue
      const style = getComputedStyle(el)
      if (style.position === 'fixed') continue
      if (r.right > vw + 1 || r.left < -1) {
        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className || '')).slice(0, 110),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          pos: style.position,
        })
      }
    }
    const images = [...document.querySelectorAll('img')]
    return {
      vw,
      scrollWidth: doc.scrollWidth,
      overflow: doc.scrollWidth - vw,
      offenders: offenders.slice(0, 40),
      broken: images.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.getAttribute('src')),
      loaded: images.filter((i) => i.complete && i.naturalWidth > 0).length,
      total: images.length,
      heroSrc: (() => {
        const h = document.querySelector('#home img')
        return h ? { src: h.getAttribute('src'), nat: h.naturalWidth + 'x' + h.naturalHeight, loading: h.getAttribute('loading'), fp: h.getAttribute('fetchpriority') } : null
      })(),
    }
  })()`)

  console.log(`\n===== ${vp.name} ${vp.width}x${vp.height} =====`)
  console.log('viewport', report.vw, 'scrollWidth', report.scrollWidth, 'overflow', report.overflow)
  console.log('images loaded', report.loaded, '/', report.total, 'broken', JSON.stringify(report.broken))
  console.log('hero:', JSON.stringify(report.heroSrc))
  console.log('horizontal offenders:')
  for (const o of report.offenders) {
    console.log(`  ${o.tag.padEnd(10)} l=${String(o.left).padStart(6)} r=${String(o.right).padStart(6)} w=${String(o.width).padStart(6)} ${o.pos.padEnd(8)} ${o.cls}`)
  }
}

ws.close()
chrome.kill()
