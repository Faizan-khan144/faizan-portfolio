import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { profileCards } from '../data'

export default function Profile() {
  return (
    <section id="profile" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">07</span>
            <span className="h-px w-10 bg-line"></span>
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Developer Profile</h2>
              <p className="mt-1 text-sm text-white/50">More than just code.</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {profileCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.1}>
              <TiltCard className="h-full">
                <div className="glass group h-full rounded-3xl p-8 text-center transition-colors duration-300 hover:border-cyan/50">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/30 to-cyan/30 text-2xl text-white transition-transform duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <h3 className="text-xl font-bold">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{card.text}</p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}