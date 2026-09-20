import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import ContactForm from '../components/ContactForm'

export default function Contact() {
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
              Let's build something <span className="text-accent">worth shipping.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Whether it's a role, a collaboration or just a good idea - my inbox is open. Send a
              message below and it lands straight in my email.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <ContactForm />
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  )
}