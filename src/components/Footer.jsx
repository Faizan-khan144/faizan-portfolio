import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import SocialLinks from './SocialLinks'
import Brand from './Brand'
import Mascot from './Mascot'
import { IconArrow } from './Icons'
import { studio } from '../data/studio'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/journey', label: 'Journey' },
  { to: '/contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mascot size={40} className="h-10 w-10 shrink-0" />
              <Link to="/" aria-label="Faizan Khan - home" className="inline-block">
                <Brand className="text-xl" />
              </Link>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Frontend developer in Karachi, Pakistan - building responsive, modern web interfaces
              and learning the MERN stack one project at a time.
            </p>
            <SocialLinks className="mt-5" />
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Sitemap</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="link-slide text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Get in touch</p>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              {profile.email}
              <IconArrow className="h-3.5 w-3.5 -rotate-45 transition-transform group-hover:translate-x-0.5" />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Open to opportunities, collaborations and interesting projects.
            </p>
            <a
              href={studio.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-3 rounded-lg border border-accent/25 bg-accent/5 px-3 py-2.5 transition-colors hover:border-accent"
            >
              <Mascot size={22} className="h-[22px] w-[22px] shrink-0" />
              <span className="leading-tight">
                <span className="block font-mono text-[0.6rem] uppercase tracking-wide2 text-accent">
                  Founder &amp; CEO
                </span>
                <span className="text-sm font-medium text-ink">Luveia Studio</span>
              </span>
              <IconArrow className="ml-3 h-3.5 w-3.5 -rotate-45 text-muted" />
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-muted">
              © {year} {profile.name}. All rights reserved.
            </p>
            <p className="flex items-center gap-2 font-mono text-xs text-muted">
              <Mascot size={18} className="h-[18px] w-[18px]" />
              Built with React · Tailwind CSS · Vite</p>
          </div>
        </div>
      </div>
    </footer>
  )
}