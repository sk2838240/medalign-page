import { spawn } from 'node:child_process'
import { setTimeout as sleep } from 'node:timers/promises'

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const PORT = 9225

const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  '--disable-gpu',
  '--no-first-run',
  '--no-default-browser-check',
  '--hide-scrollbars',
  '--user-data-dir=C:\\Users\\gkuma\\AppData\\Local\\Temp\\kilo\\chrome-medalign3',
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
await cmd('Network.enable')

const requests = []
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data)
  if (msg.method === 'Network.responseReceived') {
    const url = msg.params.response.url
    if (url.includes('webp') || url.includes('jpg')) {
      requests.push({ status: msg.params.response.status, url: url.split('/').pop() })
    }
  }
  if (msg.method === 'Network.loadingFailed') {
    const url = msg.params?.requestId ? '' : ''
    requests.push({ status: 'FAILED:' + msg.params.errorText, url: msg.params.type })
  }
})

const evaluate = async (expression) => {
  const r = await cmd('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.text)
  return r.result.value
}

await cmd('Emulation.setDeviceMetricsOverride', {
  width: 1440,
  height: 900,
  deviceScaleFactor: 1,
  mobile: false,
})
await cmd('Page.navigate', { url: 'http://localhost:5173/' })
await sleep(2500)

// scroll right to the FinalCta section and stay there
const info = await evaluate(`(async () => {
  const sections = [...document.querySelectorAll('section')]
  const last = sections[sections.length - 1]
  last.scrollIntoView({ block: 'center' })
  await new Promise((r) => setTimeout(r, 2500))
  const imgs = [...document.querySelectorAll('img')]
  return {
    sectionTop: Math.round(last.getBoundingClientRect().top),
    imgStates: imgs.map((i) => ({
      file: (i.getAttribute('src') || '').split('/').pop(),
      complete: i.complete,
      nat: i.naturalWidth + 'x' + i.naturalHeight,
      loading: i.getAttribute('loading'),
      rect: (() => { const r = i.getBoundingClientRect(); return Math.round(r.top) + ',' + Math.round(r.height) })(),
    })),
  }
})()`)

console.log('final section top in viewport:', info.sectionTop)
console.log('\nimage states:')
for (const i of info.imgStates) {
  console.log(`  ${i.file.padEnd(32)} complete=${String(i.complete).padEnd(5)} nat=${i.nat.padEnd(10)} loading=${String(i.loading).padEnd(6)} top=${i.rect}`)
}

console.log('\nnetwork responses:')
for (const r of requests) console.log(`  ${String(r.status).padEnd(12)} ${r.url}`)

ws.close()
chrome.kill()
