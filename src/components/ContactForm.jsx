import { useState } from 'react'
import { profile } from '../data/profile'

const inputClasses =
  'w-full rounded-md border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent/60'

export default function ContactForm() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const payload = Object.fromEntries(new FormData(form))
    payload._captcha = 'false'
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        setStatus('ok')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-surface p-6 shadow-card sm:p-8">
      <input
        type="text"
        name="_honey"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm text-ink">
            Name <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm text-ink">
            Email <span className="text-accent" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="mb-2 block text-sm text-ink">
          Subject <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="What is this about?"
          className={inputClasses}
        />
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-2 block text-sm text-ink">
          Message <span className="text-accent" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          placeholder="Tell me about your project or opportunity."
          className={`${inputClasses} resize-y`}
        ></textarea>
      </div>

      {status === 'ok' && (
        <p className="mt-4 rounded-md border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
          Message sent - thank you! I'll get back to you as soon as I can.
        </p>
      )}

      {status === 'error' && (
        <p className="mt-4 rounded-md border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-ink">
          Something went wrong. Please email me directly at{' '}
          <a href={`mailto:${profile.email}`} className="text-accent hover:underline">
            {profile.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="btn-base mt-6 w-full bg-accent text-accent-ink transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Sent straight to my inbox at {profile.email}. The first submission asks for a quick
        one-time confirmation on your side - after that, every message lands directly in my Gmail.
      </p>
    </form>
  )
}