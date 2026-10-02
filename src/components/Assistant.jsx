import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ChatPanel from './ChatPanel'
import Mascot from './Mascot'
import { IconClose } from './Icons'

export default function Assistant() {
  const [open, setOpen] = useState(false)
  const [hint, setHint] = useState(false)

  useEffect(() => {
    function openPanel() {
      setOpen(true)
      setHint(false)
    }
    window.addEventListener('fz:assistant:open', openPanel)
    return () => window.removeEventListener('fz:assistant:open', openPanel)
  }, [])

  useEffect(() => {
    if (open || hint) return undefined
    const t = setTimeout(() => setHint(true), 2600)
    return () => clearTimeout(t)
  }, [open, hint])

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          setOpen((v) => !v)
          setHint(false)
        }}
        initial={false}
        animate={{ y: [0, -3, 0] }}
        transition={{ y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-expanded={open}
        aria-label={open ? 'Close assistant' : 'Ask about Faizan'}
        className="fixed bottom-6 right-6 z-[75] flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-accent/30 bg-accent text-accent-ink shadow-card transition-transform"
      >
        <span
          className="absolute inset-0 -z-10 animate-ping rounded-full border-2 border-accent/60 opacity-30"
          aria-hidden="true"
        ></span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? 'close' : 'mascot'}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex"
          >
            {open ? <IconClose className="h-6 w-6" /> : <Mascot size={44} className="h-11 w-11" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {hint && !open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="fixed right-4 bottom-24 z-[74] left-4 sm:left-auto sm:w-[300px]"
          >
            <div className="relative flex items-start gap-3 rounded-2xl border border-line/15 bg-surface p-3.5 pr-9 shadow-card-hover">
              <span className="shrink-0 overflow-hidden rounded-full bg-accent/15">
                <Mascot size={34} className="h-[34px] w-[34px]" />
              </span>
              <button
                type="button"
                onClick={() => {
                  setOpen(true)
                  setHint(false)
                }}
                className="text-left"
              >
                <p className="text-sm font-semibold text-ink">Hi, I&apos;m FZ AI</p>
                <p className="mt-0.5 text-xs leading-relaxed text-muted">
                  Ask me anything about Faizan - his work, skills, projects or journey.
                </p>
              </button>
              <button
                type="button"
                onClick={() => setHint(false)}
                aria-label="Dismiss"
                className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full text-muted transition hover:bg-surface-2 hover:text-ink"
              >
                <IconClose className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Faizan AI Assistant"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 bottom-24 left-4 z-[75] max-h-[min(640px,78vh)] sm:left-auto sm:right-6 sm:w-[400px]"
          >
            <ChatPanel autoFocus />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
