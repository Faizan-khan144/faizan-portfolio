import { SYSTEM_PROMPT } from './_lib/context.js'

const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions'
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'

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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const key = process.env.GROQ_API_KEY
  if (!key) {
    return res.status(503).json({
      fallback: true,
      error: 'AI key not configured',
    })
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

  try {
    const upstream = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...past,
          { role: 'user', content: trimmed },
        ],
        temperature: 0.5,
        max_tokens: 700,
        top_p: 0.9,
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '')
      console.error('groq error', upstream.status, detail.slice(0, 300))
      return res.status(502).json({ fallback: true, error: 'Upstream model error' })
    }

    const data = await upstream.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()

    if (!reply) {
      return res.status(502).json({ fallback: true, error: 'Empty model response' })
    }

    cacheSet(cacheKey, reply)
    return res.status(200).json({ reply, model: MODEL, cached: false })
  } catch (err) {
    console.error('chat handler failed', err)
    return res.status(500).json({ fallback: true, error: 'Assistant unavailable' })
  }
}
