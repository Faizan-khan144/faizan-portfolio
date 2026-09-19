import { motion } from 'framer-motion'
import HeroScene from './HeroScene'
import { heroStats, profile, socials } from '../data'

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 crt-overlay opacity-30"></div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="container-x relative z-10 grid w-full items-center gap-14 lg:grid-cols-[1.05fr_1fr]"
      >
        <div>
          <motion.div variants={item} className="font-mono text-xs text-muted md:text-sm">
            <span className="text-accent">$</span> whoami --self
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display font-bold leading-[0.9] tracking-tight"
          >
            <span className="block text-[18vw] lg:text-[6.5rem] xl:text-[7.75rem]">Faizan</span>
            <span className="text-gradient block text-[18vw] lg:text-[6.5rem] xl:text-[7.75rem]">
              Khan
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 font-mono text-sm font-medium uppercase tracking-[0.3em] text-cyan md:text-base"
          >
            Frontend Developer
          </motion.p>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-xl"
          >
            <span className="text-accent">##</span> I build responsive, modern and{' '}
            <span className="font-semibold text-ink">user-friendly websites</span> with
            clean code and thoughtful interfaces.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <span className="chip">
              <span className="h-2 w-2 rounded-full bg-accent"></span> {profile.status}
            </span>
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="group rounded-full bg-accent px-8 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-bg transition-all hover:brightness-110"
            >
              View My Work{' '}
              <span className="inline-block transition-transform group-hover:translate-x-0.5">
                &#8594;
              </span>
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/20 px-8 py-4 font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:border-accent hover:text-accent"
            >
              About Me
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-6">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent md:text-sm"
              >
                <span className="text-accent">&#8599;</span> {s.label}
              </a>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-5xl font-bold text-ink md:text-6xl">
                  {stat.num.includes('+') && <span className="text-cyan">+</span>}
                  {stat.num}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted md:text-xs">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative mx-auto hidden aspect-square w-full max-w-xl lg:block"
        >
          <div className="pointer-events-none absolute inset-0 animate-pulseGlow bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16),transparent_65%)]"></div>
          <HeroScene />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 md:block">
        <a href="#about" className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted transition-colors hover:text-accent">
          Scroll
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