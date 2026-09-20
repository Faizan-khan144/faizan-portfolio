import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import Timeline from '../components/Timeline'
import GoToLink from '../components/GoToLink'
import { journey } from '../data/journey'
import { profile } from '../data/profile'

export default function Journey() {
  return (
    <PageTransition>
      <Seo
        title="Journey - Faizan Khan"
        description="The development journey of Faizan Khan - from first HTML and CSS to React, a frontend internship, Python, and now learning the MERN stack."
        path="/journey"
      />

      <section className="pt-36 pb-16 sm:pt-44 lg:pt-48 lg:pb-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="text-accent">04</span>
              <span className="h-px w-8 bg-line" aria-hidden="true"></span>
              Journey
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              From first tag to{' '}
              <span className="text-accent-serif">full-stack ambitions.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              A honest record of my path so far - every milestone here is tied to something real:
              a repository, a project or an internship I completed.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <Reveal>
              <Timeline items={journey} />
            </Reveal>
          </div>

          <div className="space-y-6 lg:pt-2">
            <Reveal delay={0.1}>
              <div className="rounded-lg border border-accent/25 bg-surface p-6">
                <p className="eyebrow mb-2">Where I am now</p>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Learning the MERN stack
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">{profile.currentFocus}</p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="eyebrow mb-2">What's on GitHub</p>
                <dl className="space-y-3">
                  {profile.facts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline justify-between gap-4">
                      <dt className="text-sm text-muted">{fact.label}</dt>
                      <dd className="font-display text-lg font-semibold text-accent">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="eyebrow mb-2">Next up</p>
                <p className="text-sm leading-relaxed text-muted">
                  Ship a full-stack application with React on the frontend and Node.js, Express.js
                  and MongoDB on the backend - end to end.
                </p>
                <GoToLink to="/projects" label="See the work so far" className="mt-4" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}