import { useEffect, useState } from 'react'

function useTypewriter(words) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  const word = words[index % words.length]

  useEffect(() => {
    if (!deleting && text === word) {
      const t = setTimeout(() => setDeleting(true), 1500)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }
    const t = setTimeout(() => {
      setText(word.slice(0, text.length + (deleting ? -1 : 1)))
    }, deleting ? 36 : 90)
    return () => clearTimeout(t)
  }, [text, deleting, index, word])

  return text
}

export default function Typewriter({ words, className = '' }) {
  const text = useTypewriter(words)

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span aria-live="polite">{text}</span>
      <span className="cursor-blink ml-1" aria-hidden="true">
        _
      </span>
    </span>
  )
}