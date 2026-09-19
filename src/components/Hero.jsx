import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { heroStats } from '../data'
import HeroCharacter from './HeroCharacter'

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const roles = ['Frontend Developer', 'React Builder', 'UI Craftsman']

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative flex min-h-screen items-center overflow-hidden py-24 md:py-28"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="container-x relative z-10 grid w-full items-center gap-12 lg:grid-cols-2"
        >
          <div className="text-center lg:text-left">
            <motion.div
              variants={item}
              className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-5 py-2 backdrop-blur-md lg:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan"></span>
              </span>
              <span className="text-sm text-white/70">Available for opportunities</span>
            </motion.div>

            <motion.p
              variants={item}
              className="font-mono text-xs uppercase tracking-[0.4em] text-cyan md:text-sm"
            >
              {roles[0]}
            </motion.p>

            <motion.h1
              variants={item}
              className="mx-auto mt-6 max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:mx-0 lg:text-8xl"
            >
              I build web<br />experiences that
              <br />
              <span className="text-gradient">make an impact.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60 md:text-lg lg:mx-0"
            >
              I'm <span className="font-semibold text-white">Faizan</span>, a
              frontend developer focused on building responsive, modern and
              user-friendly websites with clean code and thoughtful interfaces.
            </motion.p>

            <motion.div
              variants={item}
              className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <Link
                to="/projects"
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-accent to-cyan px-9 py-4 text-sm font-semibold transition-transform duration-200 hover:scale-105"
              >
                <span className="relative z-10">
                  Explore My Work{' '}
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    &#8599;
                  </span>
                </span>
              </Link>
              <Link
                to="/about"
                className="rounded-full border border-white/20 px-9 py-4 text-sm font-medium text-white/80 transition-all duration-200 hover:border-accent hover:text-accent"
              >
                More About Me
              </Link>
            </motion.div>

            <motion.div
              variants={item}
              className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-line pt-10 sm:grid-cols-3 lg:mx-0"
            >
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1 lg:items-start"
                >
                  <span className="text-4xl font-extrabold text-gradient md:text-5xl">
                    {stat.num}
                  </span>
                  <span className="text-sm text-white/50">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={item}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(155,91,255,0.22),transparent_70%)]"></div>
            <HeroCharacter />
          </motion.div>
        </motion.div>

        <motion.a
          href="#work"
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:block"
          aria-label="Scroll down"
          onClick={(e) => {
            const el = document.getElementById('work')
            if (el) {
              e.preventDefault()
              el.scrollIntoView({ behavior: 'smooth' })
            }
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/30 p-1.5">
              <span className="h-2 w-1 rounded-full bg-cyan"></span>
            </div>
          </motion.div>
        </motion.a>

        <span className="pointer-events-none absolute bottom-6 right-8 hidden font-mono text-xs text-white/30 md:block">
          FAIZAN KHAN 2026
        </span>
      </section>

      {/* Marquee strip */}
      <div className="relative z-10 select-none overflow-hidden border-y border-line bg-white/[0.02] py-5 backdrop-blur-md">
        <div className="marquee flex whitespace-nowrap font-mono text-sm uppercase tracking-[0.3em] text-white/40">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="marquee-track flex shrink-0 items-center">
              {[
                'Frontend Development',
                'React',
                'Tailwind CSS',
                'JavaScript',
                'Responsive Design',
                'Clean Code',
                'MERN',
                'UI / UX',
              ].map((t) => (
                <span key={t} className="mx-6 flex items-center gap-6">
                  {t}
                  <span className="text-cyan">&#8226;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}