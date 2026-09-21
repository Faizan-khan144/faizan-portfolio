import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getReply, suggestedPrompts } from '../data/assistant'
import { profile } from '../data/profile'
import { IconChat, IconClose, IconSend } from './Icons'

function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-1 py-1.5" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  )
}

function BubbleLink({ link, onDone }) {
  if (link.url.startsWith('/')) {
    return (
      <Link
        to={link.url}
        onClick={onDone}
        className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent hover:text-accent-ink"
      >
        {link.label}
        <IconSend className="h-3 w-3 rotate-45 transition-transform group-hover:translate-x-0.5" />
      </Link>
    )
  }
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent hover:text-accent-ink"
    >
      {link.label}
      <IconSend className="h-3 w-3 rotate-45 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && !started) {
      setStarted(true)
      setTyping(true)
      const t = setTimeout(() => {
        setTyping(false)
        setMessages((m) => [{ role: 'bot', ...getReply('hi') }])
      }, 800)
      return () => clearTimeout(t)
    }
    if (open) inputRef.current?.focus()
    return undefined
  }, [open, started])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function ask(question) {
    const text = question.trim()
    if (!text || typing) return
    setValue('')
    setMessages((m) => [...m, { role: 'user', text }])
    setTyping(true)
    const t = setTimeout(() => {
      const reply = getReply(text)
      setTyping(false)
      setMessages((m) => [...m, { role: 'bot', ...reply }])
    }, 700 + Math.random() * 500)
    return () => clearTimeout(t)
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={false}
        animate={{ scale: [1, 1.08, 1], opacity: 1 }}
        transition={{ scale: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' } }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        aria-expanded={open}
        aria-label={open ? 'Close assistant' : 'Ask about Faizan'}
        className="fixed bottom-6 right-6 z-[75] flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-ink shadow-card transition-transform hover:scale-105"
      >
        <span
          className="absolute inset-0 -z-10 rounded-full border-2 border-accent/60 animate-ping opacity-30"
          aria-hidden="true"
        ></span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'chat'}
            initial={{ rotate: -60, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 60, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconChat className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Faizan AI Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 bottom-24 left-4 z-[75] flex max-h-[min(620px,76vh)] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card-hover sm:left-auto sm:right-6 sm:w-[400px]"
          >
            <div className="flex items-center gap-3 border-b border-line bg-surface-2/60 px-4 py-3.5">
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt=""
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border border-line object-cover"
                />
                <span
                  className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-500"
                  aria-hidden="true"
                ></span>
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Faizan's AI Assistant</p>
                <p className="font-mono text-[0.6rem] uppercase tracking-wide2 text-accent">
                  Online · Answers from his real work
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:text-accent"
              >
                <IconClose className="h-4 w-4" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto px-4 py-4"
              role="log"
              aria-live="polite"
            >
              {messages.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      m.role === 'user'
                        ? 'rounded-br-md bg-accent text-accent-ink'
                        : 'rounded-bl-md border border-line bg-surface-2 text-ink'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.text}</p>
                    {m.links?.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {m.links.map((link) => (
                          <BubbleLink key={link.url} link={link} onDone={() => setOpen(false)} />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl rounded-bl-md border border-line bg-surface-2 px-4 py-1.5">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="border-t border-line bg-surface/60 px-4 py-3">
              <div className="flex snap-x gap-2 overflow-x-auto pb-2" role="list" aria-label="Suggested questions">
                {suggestedPrompts.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => ask(q)}
                    className="snap-start shrink-0 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs text-muted transition hover:border-accent/50 hover:text-accent"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  ask(value)
                }}
                className="mt-1 flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="Ask about Faizan..."
                  aria-label="Ask about Faizan"
                  className="h-11 flex-1 rounded-full border border-line bg-surface-2 px-4 text-sm text-ink outline-none transition placeholder:text-muted/70 focus:border-accent/60"
                />
                <button
                  type="submit"
                  disabled={!value.trim() || typing}
                  aria-label="Send message"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink transition hover:bg-accent-ink hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <IconSend className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}