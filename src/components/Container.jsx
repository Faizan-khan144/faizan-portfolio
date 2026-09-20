export default function Container({ children, className = '' }) {
  return <div className={`container-x ${className}`}>{children}</div>
}