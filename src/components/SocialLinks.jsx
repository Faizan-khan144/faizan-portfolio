import { socials } from '../data/profile'
import { IconGitHub, IconLinkedIn, IconX, IconInstagram, IconMail } from './Icons'

const icons = {
  GitHub: IconGitHub,
  LinkedIn: IconLinkedIn,
  X: IconX,
  Instagram: IconInstagram,
  Email: IconMail,
}

export default function SocialLinks({ className = '', iconClass = 'h-5 w-5' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socials.map((social) => {
        const Icon = icons[social.label]
        return (
          <li key={social.label}>
            <a
              href={social.url}
              target={social.label === 'Email' ? undefined : '_blank'}
              rel={social.label === 'Email' ? undefined : 'noreferrer'}
              aria-label={social.label}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-muted transition-colors duration-200 hover:bg-accent hover:text-accent-ink"
            >
              <Icon className={iconClass} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}