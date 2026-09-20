import { useState } from 'react'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import { profile } from '../data/profile'
import { IconMail, IconMapPin } from '../components/Icons'

const inputClasses =
  'w-full rounded-md border border-line bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/70 transition-colors focus:border-accent/60'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = data.get('name') || ''
    const email = data.get('email') || ''
    const subject = data.get('subject') || ''
    const message = data.get('message') || ''

    const mailSubject = encodeURIComponent(subject || `Portfolio inquiry from ${name}`)
    const mailBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    window.location.href = `mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`
    setSent(true)
  }

  return (
    <PageTransition>
      <Seo
        title="Contact - Faizan Khan"
        description="Get in touch with Faizan Khan - frontend developer based in Karachi, Pakistan. Open to opportunities, collaborations and interesting projects."
      />

      <section className="pt-36 pb-16 sm:pt-44 lg:pt-48 lg:pb-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="text-accent">05</span>
              <span className="h-px w-8 bg-line" aria-hidden="true"></span>
              Contact
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              Let's build something <span className="text-accent-serif">worth shipping.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Whether it's a role, a collaboration or just a good idea - my inbox is open. I'll
              get back to you as soon as I can.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="space-y-4">
              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="eyebrow mb-3">Email</p>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 break-all text-sm text-ink transition-colors hover:text-accent"
                >
                  <IconMail className="h-4 w-4 shrink-0 text-accent" />
                  {profile.email}
                </a>
              </div>

              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="eyebrow mb-3">Location</p>
                <p className="inline-flex items-center gap-2 text-sm text-ink">
                  <IconMapPin className="h-4 w-4 text-accent" />
                  {profile.location}
                  <span className="text-muted">· Remote friendly</span>
                </p>
              </div>

              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="eyebrow mb-3">Elsewhere</p>
                <SocialLinks />
              </div>

              <div className="rounded-lg border border-accent/25 bg-surface p-6">
                <p className="eyebrow mb-2">Availability</p>
                <p className="inline-flex items-center gap-2 text-sm text-ink">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
                  {profile.availability}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Currently focused on the MERN stack and frontend roles.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="rounded-lg border border-line bg-surface p-6 sm:p-8" noValidate={false}>
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
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
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
                  rows="6"
                  required
                  placeholder="Tell me about your project or opportunity."
                  className={`${inputClasses} resize-y`}
                ></textarea>
              </div>

              {sent && (
                <p className="mt-4 rounded-md border border-accent/30 bg-accent/10 px-4 py-3 text-sm text-ink">
                  {sent
                    ? "Your email app should have opened with everything pre-filled. Hit send there and I'll reply soon."
                    : ''}
                </p>
              )}

              <button type="submit" className="btn-base mt-6 w-full bg-accent text-accent-ink hover:bg-accent/90 sm:w-auto">
                Send message
              </button>

              <p className="mt-4 text-xs leading-relaxed text-muted">
                This site has no backend, so submitting opens your email client with the message
                ready to send to {profile.email}.
              </p>
            </form>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  )
}