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
    ? `btn-base group border border-accent bg-accent text-accent-ink transition-colors duration-300 hover:bg-accent-ink hover:text-accent ${className}`
    : `btn-base group border border-line bg-surface text-ink transition-colors duration-300 hover:border-accent/60 hover:text-accent ${className}`

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