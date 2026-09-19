import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { services } from '../data'

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">02</span>
            <span className="h-px w-10 bg-line"></span>
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">What I Do</h2>
              <p className="mt-1 text-sm text-white/50">
                Building for the modern web.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="glass group relative h-full overflow-hidden rounded-3xl p-7 transition-colors duration-300 hover:border-accent/50">
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/20 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-sm text-white/40">{service.num}</span>
                    <span className="text-2xl text-cyan">{service.icon}</span>
                  </div>
                  <h3 className="mt-10 text-lg font-bold">{service.title}</h3>
                  <p className="mt-3 min-h-[96px] text-sm leading-relaxed text-white/55">
                    {service.text}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-line bg-white/5 px-3 py-1 font-mono text-xs text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}