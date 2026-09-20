import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SocialLinks from '../components/SocialLinks'
import { profile } from '../data/profile'
import { IconMapPin } from '../components/Icons'

const learningCards = [
  {
    num: '01',
    title: 'Self-taught foundations',
    text: 'Started with the fundamentals - HTML, CSS and JavaScript - learning by reading documentation, building small projects and shipping them publicly.',
  },
  {
    num: '02',
    title: 'Learning by building',
    text: 'Most of my growth comes from projects: ecommerce stores, dashboards, landing pages and developer tools. Each one teaches something the next one uses.',
  },
  {
    num: '03',
    title: 'CodeAlpha internship',
    text: 'Completed practical frontend tasks through the CodeAlpha internship program, working on real project-based assignments end to end.',
  },
]

const interests = [
  'Responsive web design',
  'UI engineering',
  'Web performance',
  'Accessibility',
  'Developer tooling',
  'Full-stack JavaScript',
  'Open source',
  'Clean code',
]

const philosophy = [
  {
    title: 'Build things you would use',
    text: 'The best practice is a product that solves a real problem - for yourself or someone else.',
  },
  {
    title: 'Clean over clever',
    text: 'Code is read more often than it is written. Clarity and structure beat clever one-liners.',
  },
  {
    title: 'Learn by shipping',
    text: 'A finished project teaches more than a perfect plan. Ship, review, then improve.',
  },
  {
    title: 'Details matter',
    text: 'Spacing, motion, focus states and hierarchy are what turn a working page into a good one.',
  },
]

export default function About() {
  return (
    <PageTransition>
      <Seo
        title="About - Faizan Khan"
        description="Frontend developer based in Karachi, Pakistan, learning by building. Focused on responsive, modern interfaces with React and Tailwind CSS, now learning the MERN stack."
        path="/about"
      />

      <section className="pt-36 pb-16 sm:pt-44 lg:pt-48 lg:pb-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="text-accent">01</span>
              <span className="h-px w-8 bg-line" aria-hidden="true"></span>
              About
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              'Designing for clarity,{' '}
              <span className="text-accent-serif">building for the web.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{profile.intro}</p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide2 text-muted">Who I am</p>
              <div className="mt-5 max-w-xl space-y-4 leading-relaxed text-muted">
                <p>
                  I'm a frontend developer from Karachi who learns by building. I care about the
                  details most people notice only when they are missing - spacing, motion,
                  hierarchy and how a page feels to use.
                </p>
                <p>
                  I started with plain HTML, CSS and JavaScript and worked my way up to React and
                  Tailwind CSS, building everything from ecommerce stores and banking sites to
                  fintech dashboards and developer tools.
                </p>
                <p>
                  Right now I'm focused on the MERN stack - Node.js, Express.js and MongoDB - so I
                  can move from building interfaces to building complete applications.
                </p>
              </div>

              <div className="mt-10 grid max-w-md grid-cols-3 divide-x divide-line rounded-lg border border-line bg-surface">
                {profile.facts.map((fact) => (
                  <div key={fact.label} className="px-4 py-5 text-center">
                    <p className="font-display text-2xl font-semibold text-accent">{fact.value}</p>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-wide2 text-muted">
                      {fact.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="eyebrow mb-4">Details</p>
                <dl className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-muted">Location</dt>
                    <dd className="inline-flex items-center gap-1.5 text-sm text-ink">
                      <IconMapPin className="h-4 w-4 text-accent" />
                      {profile.location}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-muted">Role</dt>
                    <dd className="text-sm text-ink">{profile.role}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-muted">Focus</dt>
                    <dd className="text-sm text-ink">MERN Stack Learner</dd>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-sm text-muted">Status</dt>
                    <dd className="inline-flex items-center gap-2 text-sm text-ink">
                      <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true"></span>
                      Open to opportunities
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-lg border border-line bg-surface p-6">
                <p className="eyebrow mb-4">Connect</p>
                <SocialLinks />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wide2 text-muted">Education & learning</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Self-directed, <span className="text-accent-serif">project-based</span> education.
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {learningCards.map((card, i) => (
              <Reveal key={card.num} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-lg border border-line bg-surface p-6 transition-colors duration-300 hover:border-accent/40">
                  <span className="font-mono text-sm text-accent">{card.num}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide2 text-muted">Current focus</p>
              <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight">
                Moving toward <span className="text-accent-serif">full-stack.</span>
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-muted">{profile.currentFocus}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {['Node.js', 'Express.js', 'MongoDB'].map((item) => (
                  <li key={item}>
                    <span className="chip">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <p className="font-mono text-xs uppercase tracking-wide2 text-muted">Professional interests</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <li key={interest}>
                    <span className="chip">{interest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <Container>
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-wide2 text-muted">Developer philosophy</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight">
              Principles I <span className="text-accent-serif">build by.</span>
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {philosophy.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05} className="h-full">
                <div className="flex h-full flex-col bg-surface p-6">
                  <span className="font-mono text-[0.65rem] tracking-wide2 text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </PageTransition>
  )
}