import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { socials } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-line bg-bg/40 p-8 text-center backdrop-blur-md md:p-16">
            <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-accent/20 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan/20 blur-3xl"></div>

            <span className="font-mono text-sm text-accent">08</span>
            <h2 className="relative mx-auto mt-4 max-w-2xl text-3xl font-extrabold md:text-5xl">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="relative mx-auto mt-6 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">
              Have a project in mind? I'm always interested in new projects,
              collaborations, internships and opportunities to grow as a developer.
            </p>

            <div className="relative mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:muhammadfaizankhan525@gmail.com"
                className="group rounded-full bg-gradient-to-r from-accent to-cyan px-8 py-4 text-sm font-semibold transition-transform duration-200 hover:scale-105"
              >
                Send Me a Message{' '}
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#8599;
                </span>
              </a>
            </div>

            <div className="relative mt-12 grid gap-4 md:grid-cols-3">
              {socials.map((social, i) => (
                <Reveal key={social.label} delay={i * 0.1}>
                  <TiltCard className="h-full">
                    <a
                      href={social.url}
                      target={social.url.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="glass group flex h-full flex-col items-center justify-center gap-2 rounded-2xl p-6 transition-colors duration-300 hover:border-accent/50"
                    >
                      <span className="font-mono text-xs tracking-widest text-white/40">
                        {social.label}
                      </span>
                      <span className="font-semibold transition-colors group-hover:text-accent">
                        {social.name}{' '}
                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                          &#8599;
                        </span>
                      </span>
                    </a>
                  </TiltCard>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}