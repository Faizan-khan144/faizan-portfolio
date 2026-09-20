import PageTransition from '../components/PageTransition'
import Seo from '../components/Seo'
import Container from '../components/Container'
import Reveal from '../components/Reveal'
import SkillCategory from '../components/SkillCategory'
import GoToLink from '../components/GoToLink'
import { skillCategories } from '../data/skills'

export default function Skills() {
  return (
    <PageTransition>
      <Seo
        title="Skills - Faizan Khan"
        description="Frontend development skills: React, JavaScript, HTML, CSS and Tailwind CSS. Learning Node.js, Express.js and MongoDB for the MERN stack, plus Python."
      />

      <section className="pt-36 pb-16 sm:pt-44 lg:pt-48 lg:pb-20">
        <Container>
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-3">
              <span className="text-accent">03</span>
              <span className="h-px w-8 bg-line" aria-hidden="true"></span>
              Skills
            </p>
            <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              A frontend-first stack, <span className="text-accent-serif">growing full-stack.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              These are the technologies I work with and the areas I'm actively learning - listed
              as capability areas rather than percentages, because real skill is measured in what
              ships.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-12 lg:py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {skillCategories.map((category, i) => (
              <Reveal key={category.id} delay={(i % 2) * 0.06} className="h-full">
                <SkillCategory category={category} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-lg border border-accent/25 bg-surface p-8 sm:flex-row sm:items-center sm:p-10">
              <div>
                <p className="eyebrow mb-2">Currently learning</p>
                <h2 className="font-display text-xl font-semibold tracking-tight">
                  Rounding out the MERN stack
                </h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  Node.js, Express.js and MongoDB - so I can design APIs, model data and ship
                  complete full-stack applications.
                </p>
              </div>
              <GoToLink to="/journey" label="See my learning journey" className="shrink-0" />
            </div>
          </Reveal>
        </Container>
      </section>
    </PageTransition>
  )
}