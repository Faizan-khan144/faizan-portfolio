import { Link } from 'react-router-dom'
import { IconArrow } from './Icons'

export default function GoToLink({ to, label, className = '' }) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 border-b border-line pb-1 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent ${className}`}
    >
      {label}
      <IconArrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  )
}