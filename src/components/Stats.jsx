import React from 'react'
import { stats } from '../data'

export default function Stats() {
  return (
    <section className="relative border-y border-line bg-ink py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="font-display text-5xl font-bold text-white md:text-7xl">
                {stat.num}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-widest text-white/50 md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}