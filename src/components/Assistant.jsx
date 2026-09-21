import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ChatPanel from './ChatPanel'
import { IconChat, IconClose } from './Icons'

export default function Assistant() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function open() {
      setOpen(true)
    }
    window.addEventListener('fz:assistant:open', open)
    return () => window.removeEventListener('fz:assistant:open', open)
  }, [])

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
            className="fixed right-4 bottom-24 left-4 z-[75] max-h-[min(640px,78vh)] sm:left-auto sm:right-6 sm:w-[400px]"
          >
            <ChatPanel autoFocus />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}