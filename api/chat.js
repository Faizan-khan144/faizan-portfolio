import { SYSTEM_PROMPT } from './_lib/context.js'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions'
const POLLINATIONS_URL = 'https://text.pollinations.ai/openai'

const MAX_MESSAGE = 800
const MAX_HISTORY = 12
const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 12

const hits = new Map()
const cache = new Map()
const CACHE_MAX = 300
const CACHE_TTL_MS = 1000 * 60 * 60 * 6

function allow(ip) {
  const now = Date.now()
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS)
  if (list.length >= MAX_PER_WINDOW) return false
  list.push(now)
  hits.set(ip, list)
  return true
}

function cacheGet(key) {
  const hit = cache.get(key)
  if (!hit) return null
  if (Date.now() - hit.at > CACHE_TTL_MS) {
    cache.delete(key)
    return null
  }
  return hit.text
}

function cacheSet(key, text) {
  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value)
  cache.set(key, { text, at: Date.now() })
}

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for']
  if (typeof fwd === 'string' && fwd.length) return fwd.split(',')[0].trim()
  return req.socket?.remoteAddress || 'unknown'
}

function buildProviders() {
  const providers = []

  const groqKey = process.env.GROQ_API_KEY
  if (groqKey) {
    const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
    providers.push({
      model,
      url: GROQ_URL,
      headers: { Authorization: `Bearer ${groqKey}`, 'Content-Type': 'application/json' },
      payload: (messages) => ({ model, messages, temperature: 0.5, max_tokens: 700, top_p: 0.9 }),
    })
  }

  const geminiKey = process.env.GEMINI_API_KEY
  if (geminiKey) {
    const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash'
    providers.push({
      model: `gemini:${model}`,
      url: GEMINI_URL,
      headers: { Authorization: `Bearer ${geminiKey}`, 'Content-Type': 'application/json' },
      payload: (messages) => ({ model, messages, temperature: 0.5, max_tokens: 1024, top_p: 0.9 }),
    })
  }

  const openrouterKey = process.env.OPENROUTER_API_KEY
  if (openrouterKey) {
    const model = process.env.OPENROUTER_MODEL || 'meta-llama/llama-3.3-70b-instruct:free'
    providers.push({
      model,
      url: OPENROUTER_URL,
      headers: { Authorization: `Bearer ${openrouterKey}`, 'Content-Type': 'application/json' },
      payload: (messages) => ({ model, messages, temperature: 0.5, max_tokens: 700, top_p: 0.9 }),
    })
  }

  const openaiKey = process.env.OPENAI_API_KEY
  if (openaiKey) {
    const model = process.env.OPENAI_MODEL || 'gpt-4o-mini'
    providers.push({
      model,
      url: OPENAI_URL,
      headers: { Authorization: `Bearer ${openaiKey}`, 'Content-Type': 'application/json' },
      payload: (messages) => ({ model, messages, temperature: 0.5, max_tokens: 700, top_p: 0.9 }),
    })
  }

  const pollModel = process.env.POLLINATIONS_MODEL || 'openai'
  providers.push({
    model: `pollinations:${pollModel}`,
    url: POLLINATIONS_URL,
    headers: { 'Content-Type': 'application/json' },
    payload: (messages) => ({
      model: pollModel,
      messages,
      temperature: 0.5,
      max_tokens: 700,
      top_p: 0.9,
      stream: false,
    }),
  })

  return providers
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message, history = [] } = req.body || {}

  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'Message is required' })
  }

  const trimmed = message.trim().slice(0, MAX_MESSAGE)

  if (!allow(clientIp(req))) {
    return res.status(429).json({ error: 'Too many messages. Give it a few seconds.' })
  }

  const past = (Array.isArray(history) ? history : [])
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.text === 'string')
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role,
      content: m.text.slice(0, 2000).replace(/[*_`#]/g, ''),
    }))

  const cacheKey = JSON.stringify([SYSTEM_PROMPT, past.map((m) => m.content), trimmed])
  const cached = cacheGet(cacheKey)

  if (cached) {
    return res.status(200).json({ reply: cached, cached: true })
  }

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...past,
    { role: 'user', content: trimmed },
  ]

  const failures = []

  for (const provider of buildProviders()) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const upstream = await fetch(provider.url, {
          method: 'POST',
          headers: provider.headers,
          body: JSON.stringify(provider.payload(messages)),
        })

        if (!upstream.ok) {
          const detail = await upstream.text().catch(() => '')
          console.error('provider error', provider.model, upstream.status, detail.slice(0, 200))
          if (attempt === 0 && (upstream.status >= 500 || upstream.status === 429)) {
            await new Promise((r) => setTimeout(r, 400))
            continue
          }
          failures.push(`${provider.model}:${upstream.status}`)
          break
        }

        const data = await upstream.json()
        const reply = data?.choices?.[0]?.message?.content?.trim()

        if (!reply) {
          if (attempt === 0) {
            await new Promise((r) => setTimeout(r, 350))
            continue
          }
          failures.push(`${provider.model}:empty`)
          break
        }

        cacheSet(cacheKey, reply)
        return res.status(200).json({ reply, model: provider.model, cached: false })
      } catch (err) {
        console.error('provider failed', provider.model, err)
        if (attempt === 0) {
          await new Promise((r) => setTimeout(r, 350))
          continue
        }
        failures.push(`${provider.model}:${err?.name || 'error'}`)
        break
      }
    }
  }

  console.error('all providers failed', failures.join(', '))
  return res.status(502).json({ fallback: true, error: 'Upstream model error' })
}
