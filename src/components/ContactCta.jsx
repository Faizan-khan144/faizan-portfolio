import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function ContactCta() {
  return (
    <section id="contact-cta" className="py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-accent/30 bg-gradient-to-br from-accent/10 via-transparent to-cyan/10 p-10 text-center md:p-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-accent/20 blur-3xl"></div>
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-cyan/20 blur-3xl"></div>
            <h2 className="relative mx-auto max-w-2xl text-3xl font-extrabold md:text-4xl">
              Have a project in <span className="text-gradient">mind?</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-sm text-white/60 md:text-base">
              I'm always interested in new projects, collaborations, internships
              and opportunities to grow as a developer.
            </p>
            <Link
              to="/contact"
              className="group relative mt-8 inline-block rounded-full bg-gradient-to-r from-accent to-cyan px-8 py-4 text-sm font-semibold transition-transform duration-200 hover:scale-105"
            >
              Let's Talk{' '}
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                &#8599;
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}