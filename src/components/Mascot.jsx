export default function Mascot({ size = 40, className = '', animate = true, mood = 'happy' }) {
  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="FZ AI mascot"
      style={{ display: 'block' }}
    >
      <path d="M32 9c0-4 3-7 7-7 0 5-2 8-7 8z" style={{ fill: 'rgb(var(--color-accent))' }} />
      <line
        x1="32"
        y1="9"
        x2="32"
        y2="14"
        stroke="rgb(var(--color-accent))"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="32" cy="8" r="2.4" style={{ fill: 'rgb(var(--color-accent))' }} />

      <rect
        x="8"
        y="14"
        width="48"
        height="44"
        rx="22"
        style={{
          fill: 'rgb(var(--color-surface-2))',
          stroke: 'rgb(var(--color-accent))',
          strokeWidth: '2.5',
        }}
      />

      <ellipse cx="18.5" cy="43" rx="4.4" ry="3" style={{ fill: 'rgb(244 114 182 / 0.35)' }} />
      <ellipse cx="45.5" cy="43" rx="4.4" ry="3" style={{ fill: 'rgb(244 114 182 / 0.35)' }} />

      <g className={animate ? 'mascot-eyes' : undefined}>
        <circle cx="23" cy="34" r="5.4" style={{ fill: 'rgb(var(--color-ink))' }} />
        <circle cx="41" cy="34" r="5.4" style={{ fill: 'rgb(var(--color-ink))' }} />
        <circle cx="24.9" cy="32" r="1.9" style={{ fill: '#ffffff' }} />
        <circle cx="42.9" cy="32" r="1.9" style={{ fill: '#ffffff' }} />
      </g>

      {mood === 'happy' ? (
        <path
          d="M27 45c2 2.7 8 2.7 10 0"
          fill="none"
          stroke="rgb(var(--color-ink))"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      ) : (
        <circle cx="32" cy="46" r="2.4" style={{ fill: 'rgb(var(--color-ink))' }} />
      )}
    </svg>
  )
}
