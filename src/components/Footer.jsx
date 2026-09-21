import { Link } from 'react-router-dom'
import { profile } from '../data/profile'
import SocialLinks from './SocialLinks'
import Brand from './Brand'
import { IconArrow } from './Icons'

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
            <Link to="/" aria-label="Faizan Khan - home" className="inline-block">
              <Brand className="text-xl" />
            </Link>
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
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-xs text-muted">
              © {year} {profile.name}. All rights reserved.
            </p>
            <p className="font-mono text-xs text-muted">Built with React · Tailwind CSS · Vite</p>
          </div>
        </div>
      </div>
    </footer>
  )
}