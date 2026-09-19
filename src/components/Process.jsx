import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { processSteps } from '../data'

export default function Process() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">04</span>
            <span className="h-px w-10 bg-line"></span>
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">My Process</h2>
              <p className="mt-1 text-sm text-white/50">
                From idea to working product.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="relative grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block"></div>
          {processSteps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="glass relative h-full rounded-2xl p-6 transition-colors duration-300 hover:border-cyan/50">
                  <span className="text-gradient font-mono text-sm">{step.num}</span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/55">{step.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}