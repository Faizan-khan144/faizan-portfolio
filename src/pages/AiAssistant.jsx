import { Sparkles } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import ChatPanel from '../components/ChatPanel'

export default function AiAssistant() {
  return (
    <PageTransition>
      <Seo
        title="FZ AI - Ask about Faizan Khan"
        description="Chat with FZ AI - a personal assistant that answers only from Faizan Khan's real profile, skills, projects and journey."
        path="/ai"
      />

      <section className="pt-36 pb-16 sm:pt-44 lg:pt-48 lg:pb-24">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="text-accent">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              FZ AI · Full-page chat
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.06] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Chat with my AI about <span className="moss-text">what I actually build.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              FZ AI answers questions about my work, skills, projects and journey - using only
              real data from this site. No fake answers, no guesswork.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-12">
            <ChatPanel tall autoFocus />
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  )
}