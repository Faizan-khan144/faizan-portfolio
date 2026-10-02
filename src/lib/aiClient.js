import { getReply } from '../data/assistant'

const ENDPOINT = '/api/chat'
const TIMEOUT_MS = 15000

export const AI_MODE = {
  pending: 'pending',
  live: 'live',
  offline: 'offline',
}

let mode = AI_MODE.pending

export function getAiMode() {
  return mode
}

export function isLive() {
  return mode === AI_MODE.live
}

function toHistory(messages) {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'bot')
    .slice(-12)
    .map((m) => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      text: m.text,
    }))
}

function offlineReply(question) {
  mode = AI_MODE.offline
  const reply = getReply(question)
  return { text: reply.text, links: reply.links || [], mode: AI_MODE.offline }
}

/**
 * Asks the assistant. Tries the real model first, silently falls back to the
 * on-device knowledge base when the endpoint is missing, unconfigured or slow.
 */
export async function askAssistant(question, messages = [], signal) {
  const text = String(question || '').trim()
  if (!text) return null

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  if (signal) signal.addEventListener('abort', () => controller.abort(), { once: true })

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, history: toHistory(messages) }),
      signal: controller.signal,
    })

    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      if (res.status === 429) {
        mode = AI_MODE.offline
        return {
          text: 'I am getting a lot of questions right now. Try again in a few seconds, or email Faizan directly.',
          links: [{ label: 'Email Faizan', url: 'mailto:muhammadfaizankhan525@gmail.com' }],
          mode: AI_MODE.offline,
        }
      }
      if (body?.error && !body?.fallback) throw new Error(body.error)
      return offlineReply(text)
    }

    const data = await res.json()
    if (typeof data?.reply !== 'string' || !data.reply.trim()) return offlineReply(text)

    mode = AI_MODE.live
    return { text: data.reply.trim(), links: [], mode: AI_MODE.live, cached: Boolean(data.cached) }
  } catch {
    return offlineReply(text)
  } finally {
    clearTimeout(timer)
  }
}
