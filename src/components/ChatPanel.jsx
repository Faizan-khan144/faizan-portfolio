import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getReply, suggestedPrompts } from '../data/assistant'
import { IconSend } from './Icons'

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

function BubbleLink({ link }) {
  if (link.url.startsWith('/')) {
    return (
      <Link
        to={link.url}
        className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition hover:bg-accent hover:text-accent-ink"
      >
        {link.label}
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
    </a>
  )
}

export default function ChatPanel({ className = '', tall = false, autoFocus = false }) {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')
  const [typing, setTyping] = useState(false)
  const [started, setStarted] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const valueRef = useRef('')
  valueRef.current = value

  useEffect(() => {
    if (!started) {
      setStarted(true)
      setTyping(true)
      const t = setTimeout(() => {
        setTyping(false)
        setMessages((m) => [{ role: 'bot', ...getReply('hi') }])
      }, 700)
      return () => clearTimeout(t)
    }
    if (autoFocus) {
      const t = setTimeout(() => inputRef.current?.focus(), 120)
      return () => clearTimeout(t)
    }
    return undefined
  }, [started, autoFocus])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  function ask(question) {
    const text = String(question ?? '').trim()
    if (!text || typing) return
    setValue('')
    valueRef.current = ''
    setMessages((m) => [...m, { role: 'user', text }])
    setTyping(true)
    setTimeout(() => {
      try {
        const reply = getReply(text)
        setMessages((m) => [...m, { role: 'bot', ...reply }])
      } catch {
        setMessages((m) => [
          ...m,
          {
            role: 'bot',
            text: "I hit a snag answering that one. Try asking me about his tech stack, projects or coding journey.",
            links: [],
          },
        ])
      } finally {
        setTyping(false)
        inputRef.current?.focus()
      }
    }, 500 + Math.random() * 400)
  }

  function sendFromInput(raw) {
    const text = String(raw ?? valueRef.current ?? '').trim()
    if (text) ask(text)
  }

  return (
    <motion.div
      className={`flex flex-col overflow-hidden rounded-2xl border border-line/15 bg-surface shadow-card-hover ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 border-b border-line/10 bg-surface-2/60 px-4 py-3.5">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent font-display text-sm font-bold text-accent-ink">
            FZ
          </div>
          <span
            className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-surface bg-emerald-500"
            aria-hidden="true"
          ></span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">FZ AI Assistant</p>
          <p className="font-mono text-[0.6rem] uppercase tracking-wide2 text-accent">
            Online · Answers from his real work
          </p>
        </div>
        <span
          className="ml-auto hidden font-mono text-[0.6rem] text-muted sm:inline-flex"
          aria-hidden="true"
        >
          {`<faizan />`}
        </span>
      </div>

      <div
        ref={scrollRef}
        className={`${tall ? 'h-[380px] lg:h-[440px]' : 'h-[300px]'} space-y-4 overflow-y-auto px-4 py-4`}
        role="log"
        aria-live="polite"
      >
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'rounded-br-md bg-accent text-accent-ink'
                  : 'rounded-bl-md border border-line/10 bg-surface-2 text-ink'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.text}</p>
              {m.links?.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {m.links.map((link) => (
                    <BubbleLink key={link.url} link={link} />
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
            <div className="rounded-2xl rounded-bl-md border border-line/10 bg-surface-2 px-4 py-1.5">
              <TypingDots />
            </div>
          </motion.div>
        )}
      </div>

      <div className="border-t border-line/10 bg-surface/60 px-4 py-3">
        <div
          className="flex snap-x gap-2 overflow-x-auto pb-2 [scrollbar-width:none]"
          role="list"
          aria-label="Suggested questions"
        >
          {suggestedPrompts.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => ask(q)}
              className="snap-start shrink-0 rounded-full border border-line/15 bg-surface-2 px-3 py-1.5 text-xs text-muted transition hover:border-accent/50 hover:text-accent"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendFromInput(e.target.message?.value)
          }}
          className="mt-1.5 flex items-center gap-2"
        >
          <input
            ref={inputRef}
            name="message"
            type="text"
            inputMode="text"
            enterKeyHint="send"
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              valueRef.current = e.target.value
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                sendFromInput(e.currentTarget.value)
              }
            }}
            placeholder="Ask about his teck stack..."
            aria-label="Ask about Faizan's tech, work or journey"
            className="h-11 flex-1 rounded-full border border-line/15 bg-surface-2 px-4 text-base text-ink outline-none transition placeholder:text-muted/70 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink transition-all duration-200 hover:bg-ink hover:text-bg active:scale-90"
            style={{ opacity: value.trim() ? 1 : 0.45 }}
          >
            <IconSend className="h-4 w-4" />
          </button>
        </form>
      </div>
    </motion.div>
  )
}