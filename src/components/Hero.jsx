import { motion } from 'framer-motion'
import { heroStats, socials } from '../data'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-16 md:pt-32"
    >
      <div className="absolute inset-0 bg-noise"></div>
      <div className="pointer-events-none absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-accent/10 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-3xl"></div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-x relative z-10"
      >
        <motion.div variants={item} className="flex flex-wrap items-center gap-3">
          <span className="chip">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-cyan"></span>
            Available for opportunities
          </span>
          <span className="chip">OPEN TO WORK</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-10 font-display text-6xl font-bold leading-[0.98] tracking-tight text-balance sm:text-7xl lg:text-[7rem]"
        >
          Faizan Khan
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 font-mono text-sm font-medium uppercase tracking-[0.35em] text-accent md:text-base"
        >
          Frontend Developer
        </motion.p>

        <motion.p
          variants={item}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-2xl"
        >
          I build responsive, modern and{' '}
          <span className="font-semibold text-ink">user-friendly websites</span>{' '}
          with clean code and thoughtful interfaces.
        </motion.p>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="group rounded-full bg-ink px-8 py-4 text-sm font-medium text-white transition-all hover:bg-accent"
          >
            View My Work{' '}
            <span className="inline-block transition-transform group-hover:translate-x-0.5">
              &#8594;
            </span>
          </a>
          <a
            href="#about"
            className="rounded-full border border-line bg-white/70 px-8 py-4 text-sm font-medium text-ink backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
          >
            About Me
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-20 flex flex-wrap items-center gap-8">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent lg:text-sm"
            >
              <span className="text-accent">&#8599;</span> {s.label}
            </a>
          ))}
          <span className="hidden font-mono text-xs text-muted/60 md:inline">
            // the web is my canvas
          </span>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-16 grid max-w-3xl grid-cols-3 gap-6 border-t border-line pt-10 md:grid-cols-3"
        >
          {heroStats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-4xl font-bold text-ink md:text-5xl">
                {stat.num}
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted md:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <a href="#about" className="flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="text-accent"
          >
            &#8595;
          </motion.span>
        </a>
      </div>
    </section>
  )
}