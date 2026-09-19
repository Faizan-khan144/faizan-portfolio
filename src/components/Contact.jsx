import { useState } from 'react'
import Reveal from './Reveal'
import { profile, socials } from '../data'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio message from ${form.name || 'someone'}`)
    const body = encodeURIComponent(`${form.message}\n\n--\n${form.name}\n${form.email}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm font-medium text-accent">05</span>
              <span className="line-h w-12"></span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
                Contact
              </span>
            </div>
            <h2 className="mt-6 font-display text-5xl font-bold leading-[1.02] tracking-tight text-balance md:text-7xl">
              Let's build something{' '}
              <span className="text-gradient">worth sharing.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">
              I'm currently open to new opportunities, collaborations and
              internships in frontend development.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-4">
              <a
                href={`mailto:${profile.email}`}
                className="glass flex items-center justify-between rounded-2xl p-6 transition-all hover:border-accent"
              >
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                    Email Me
                  </div>
                  <div className="mt-2 font-medium text-ink md:text-lg">
                    {profile.email}
                  </div>
                </div>
                <span className="text-accent">&#8599;</span>
              </a>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target={s.url.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="glass flex items-center justify-between rounded-2xl p-6 transition-all hover:border-accent"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                      {s.label}
                    </div>
                    <div className="mt-2 font-medium text-ink md:text-lg">
                      {s.name}
                    </div>
                  </div>
                  <span className="text-accent">&#8599;</span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-7 md:p-9"
            >
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-ink placeholder:text-muted/60 focus:border-accent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-line bg-white px-4 py-3.5 text-ink placeholder:text-muted/60 focus:border-accent"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3.5 text-ink placeholder:text-muted/60 focus:border-accent"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-ink px-6 py-4 font-medium text-white transition-all hover:bg-accent"
                >
                  Send Message{' '}
                  <span className="inline-block transition-transform group-hover:translate-x-1">
                    &#8594;
                  </span>
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}