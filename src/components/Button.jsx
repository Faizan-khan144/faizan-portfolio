import { Link } from 'react-router-dom'
import { IconArrow } from './Icons'

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  className = '',
  onClick,
  type,
  withArrow = false,
}) {
  const cls = variant === 'primary'
    ? `btn-base btn-shine btn-glow group rounded-full bg-ink text-bg transition-colors duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-accent-ink ${className}`
    : `btn-base group rounded-full border border-line/20 bg-transparent text-ink transition-colors duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:text-accent ${className}`

  const inner = (
    <>
      {children}
      {withArrow && (
        <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  }

  if (href) {
    const external = href.startsWith('http')
    return (
      <a href={href} className={cls} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
        {inner}
      </a>
    )
  }

  return (
    <button type={type ?? 'button'} onClick={onClick} className={cls}>
      {inner}
    </button>
  )
}