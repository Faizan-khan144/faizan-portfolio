import Reveal from './Reveal'
import TiltCard from './TiltCard'
import { aboutItems } from '../data'

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <div className="mb-12 flex items-center gap-4">
            <span className="font-mono text-sm text-accent">01</span>
            <span className="h-px w-10 bg-line"></span>
            <h2 className="text-3xl font-extrabold md:text-4xl">About Me</h2>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <TiltCard className="h-full">
              <div className="glass h-full rounded-3xl p-8 md:p-12">
                <h3 className="text-2xl font-bold leading-snug md:text-3xl">
                  A developer who enjoys{' '}
                  <span className="text-gradient">building things.</span>
                </h3>
                <div className="mt-6 space-y-4 text-white/60">
                  <p>
                    I'm a web developer with a strong focus on frontend development
                    and modern web technologies.
                  </p>
                  <p>
                    I work with HTML, CSS, JavaScript, React and Tailwind CSS to
                    create responsive interfaces that work across different screen
                    sizes.
                  </p>
                  <p>
                    I'm also expanding into backend development with Node.js,
                    Express.js and MongoDB while continuing to explore Python and
                    data analysis.
                  </p>
                  <p>
                    I enjoy turning ideas into functional projects, experimenting
                    with new technologies and improving my development skills
                    through practical work.
                  </p>
                </div>
              </div>
            </TiltCard>
          </Reveal>

          <div className="flex flex-col gap-4">
            {aboutItems.map((item, i) => (
              <Reveal key={item.num} delay={i * 0.1}>
                <TiltCard>
                  <div className="glass group flex items-center gap-5 rounded-2xl p-5 transition-colors duration-300 hover:border-accent/50">
                    <span className="font-mono text-sm text-white/40 transition-colors group-hover:text-accent">
                      {item.num}
                    </span>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-white/50">{item.text}</p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}