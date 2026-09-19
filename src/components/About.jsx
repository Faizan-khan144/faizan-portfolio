import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { profile } from '../data'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            num="01"
            label="About"
            title="Developer who cares about the details."
          />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="space-y-6">
              {profile.bio.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-muted md:text-xl">
                  {p}
                </p>
              ))}

              <div className="mt-10 flex flex-col gap-3 font-mono text-sm border border-white/10 rounded-2xl p-6">
                <div>
                  <span className="text-muted">$ JOB: </span>
                  <span className="text-ink">{profile.job}</span>
                </div>
                <div>
                  <span className="text-muted">$ BASED: </span>
                  <span className="text-ink">{profile.location}</span>
                </div>
                <div>
                  <span className="text-muted">$ EMAIL: </span>
                  <a href={`mailto:${profile.email}`} className="text-cyan hover:underline">
                    {profile.email}
                  </a>
                </div>
                <div>
                  <span className="text-muted">$ STATUS: </span>
                  <span className="inline-flex items-center gap-2 text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent"></span>
                    {profile.status}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              {profile.points.map((point) => (
                <div
                  key={point.num}
                  className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-medium text-accent">
                      {point.num}
                    </span>
                    <span className="text-cyan transition-transform duration-300 group-hover:rotate-45">
                      &#8599;
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}