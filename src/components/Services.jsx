import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { services } from '../data'

export default function Services() {
  return (
    <section id="skills" className="relative py-24 md:py-36">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            num="02"
            label="Skills & Services"
            title="What I can do for you."
            desc="Typical queries I can help with — run one and see what I handle."
          />
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, i) => (
            <Reveal key={service.num} delay={(i % 2) * 0.08}>
              <div className="glass group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 md:p-9">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-accent">
                    {service.num}
                  </span>
                  <span className="font-mono text-xs text-muted">$ run &gt;</span>
                </div>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{service.text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.tags.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}