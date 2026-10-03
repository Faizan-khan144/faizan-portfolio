const STORAGE_KEY = 'fz-mascot-sound'

let audioContext = null

export function isSoundOn() {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== 'off'
  } catch {
    return true
  }
}

export function setSoundOn(on) {
  try {
    window.localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  } catch {
    /* storage may be unavailable */
  }
}

function getAudioContext() {
  if (typeof window === 'undefined') return null
  const Ctx = window.AudioContext || window.webkitAudioContext
  if (!Ctx) return null
  if (!audioContext) audioContext = new Ctx()
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {})
  return audioContext
}

export function playChirp() {
  if (!isSoundOn()) return
  const ac = getAudioContext()
  if (!ac) return
  const now = ac.currentTime
  const notes = [620, 880]
  notes.forEach((freq, i) => {
    const start = now + i * 0.09
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, start)
    gain.gain.setValueAtTime(0.0001, start)
    gain.gain.exponentialRampToValueAtTime(0.08, start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16)
    osc.connect(gain)
    gain.connect(ac.destination)
    osc.start(start)
    osc.stop(start + 0.18)
  })
}

export function speak(text) {
  if (!isSoundOn()) return
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 1.02
    utterance.pitch = 1.15
    utterance.volume = 0.9
    const voices = window.speechSynthesis.getVoices()
    const preferred =
      voices.find((v) => /en-(US|GB|IN)/i.test(v.lang)) || voices.find((v) => /^en/i.test(v.lang))
    if (preferred) utterance.voice = preferred
    window.speechSynthesis.speak(utterance)
  } catch {
    /* speech may be blocked */
  }
}

export function muteVoice() {
  try {
    window.speechSynthesis?.cancel()
  } catch {
    /* ignore */
  }
}
