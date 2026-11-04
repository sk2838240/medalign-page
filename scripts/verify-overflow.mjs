import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9226

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  '--user-data-dir=C:\\Users\\gkuma\\AppData\\Local\\Temp\\kilo\\chrome-medalign4',
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

await cmd('Emulation.setDeviceMetricsOverride', {
  width: 390,
  height: 844,
  deviceScaleFactor: 1,
  mobile: true,
})
await cmd('Page.navigate', { url: 'http://localhost:5173/' })
await sleep(3000)

const report = await evaluate(`(() => {
  const doc = document.documentElement
  const widest = []
  for (const el of document.querySelectorAll('body, body *')) {
    const r = el.getBoundingClientRect()
    if (r.width === 0 && r.height === 0) continue
    if (r.right > 390) {
      widest.push({
        tag: el.tagName.toLowerCase(),
        right: Math.round(r.right),
        cls: String(el.className || '').slice(0, 90),
      })
    }
  }
  widest.sort((a, b) => b.right - a.right)
  const bodySW = document.body.scrollWidth
  const htmlSW = doc.scrollWidth
  const hero = document.querySelector('#home')
  const heroSW = hero ? hero.scrollWidth : null
  const heroCW = hero ? hero.clientWidth : null
  return { bodySW, htmlSW, heroSW, heroCW, top: widest.slice(0, 12) }
})()`)

console.log('body.scrollWidth', report.bodySW, 'html.scrollWidth', report.htmlSW)
console.log('hero section scrollWidth', report.heroSW, 'clientWidth', report.heroCW)
console.log('widest elements beyond 390:')
for (const w of report.top) {
  console.log(`  r=${String(w.right).padStart(5)} ${w.tag.padEnd(8)} ${w.cls}`)
}

ws.close()
chrome.kill()
