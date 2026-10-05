import { forwardRef } from 'react'

const ACCENT = 'rgb(var(--color-accent))'
const ACCENT_2 = 'rgb(var(--color-accent-2))'
const INK = 'rgb(var(--color-ink))'
const SURFACE_2 = 'rgb(var(--color-surface-2))'

const BLUSH = 'rgb(244 114 182 / 0.38)'

/**
 * "Byte" — the FZ AI mascot.
 *
 * A chunky little hover-bot: domed visor head, segmented face plate,
 * bolt detail, cheek vents, side ear-pods, hinged arms with grippers,
 * and twin thruster boots. Reads well from 32px to 600px.
 *
 * Props:
 *   look={{ x, y }}  pointer-driven eye offset, -1..1
 *   blink            squashes the eyes
 *   grin             open laughing mouth
 *   mood             'happy' | 'curious' | 'idle'
 */
const Mascot = forwardRef(function Mascot(
  {
    size = 160,
    className = '',
    look = { x: 0, y: 0 },
    blink = false,
    grin = false,
    mood = 'happy',
    ...rest
  },
  ref,
) {
  const dx = look.x * 3.4
  const dy = look.y * 3
  const tilt = look.x * 3.6
  const lean = look.y * 1.4

  const eyeStyle = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transform: blink ? 'scaleY(0.07)' : 'scaleY(1)',
    transition: 'transform 90ms ease',
  }

  const browLift = mood === 'curious' ? -2.6 : mood === 'idle' ? 0.9 : 0
  const browOpacity = mood === 'idle' ? 0.55 : 0.8

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Byte, the FZ AI mascot"
      style={{ display: 'block', overflow: 'visible' }}
      {...rest}
    >
      <defs>
        <linearGradient id="bt-shell" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor={SURFACE_2} />
          <stop offset="100%" stopColor="#c7cbe0" />
        </linearGradient>
        <linearGradient id="bt-shell-dark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={SURFACE_2} />
          <stop offset="100%" stopColor="#aab0cc" />
        </linearGradient>
        <linearGradient id="bt-visor" x1="0.1" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#8b8ff5" />
          <stop offset="45%" stopColor={ACCENT_2} />
          <stop offset="100%" stopColor={ACCENT} />
        </linearGradient>
        <linearGradient id="bt-metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8eaf6" />
          <stop offset="50%" stopColor="#b6bad6" />
          <stop offset="100%" stopColor="#8f95b4" />
        </linearGradient>
        <radialGradient id="bt-bulb" cx="0.38" cy="0.32" r="0.72">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#c4c6ff" />
          <stop offset="100%" stopColor={ACCENT} />
        </radialGradient>
        <radialGradient id="bt-cheek" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff9ec4" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ff9ec4" stopOpacity="0" />
        </radialGradient>
        <clipPath id="bt-visor-clip">
          <path d="M27 52c0-9.4 7.6-17 17-17h32c9.4 0 17 7.6 17 17v22c0 9.4-7.6 17-17 17H44c-9.4 0-17-7.6-17-17z" />
        </clipPath>
      </defs>

      <g transform="translate(8.6 -4.3) scale(0.857)">
        <ellipse cx="60" cy="141" rx="30" ry="5.5" style={{ fill: INK, opacity: 0.14 }} />
        <ellipse cx="60" cy="140" rx="19" ry="3" style={{ fill: ACCENT, opacity: 0.2 }} />

        <g transform={`rotate(${tilt} 60 96) translate(0 ${lean})`}>
        <path
          d="M60 22c0-7.6 6-13.4 13.4-13.4 0 9.4-4 15.2-13.4 15.2z"
          style={{ fill: ACCENT }}
        />
        <line x1="60" y1="22" x2="60" y2="31" stroke={ACCENT} strokeWidth="3.4" strokeLinecap="round" />
        <circle cx="60" cy="19" r="5.4" fill="url(#bt-bulb)" />
        <circle cx="60" cy="19" r="9.4" style={{ fill: ACCENT, opacity: 0.2 }} className="byte-pulse" />
        <circle cx="60" cy="19" r="13.6" style={{ fill: ACCENT, opacity: 0.1 }} className="byte-pulse byte-pulse-lag" />

        <g className="bt-thruster">
          <rect x="41" y="128" width="16" height="12" rx="4" fill="url(#bt-shell-dark)" stroke={ACCENT} strokeWidth="1.6" />
          <rect x="63" y="128" width="16" height="12" rx="4" fill="url(#bt-shell-dark)" stroke={ACCENT} strokeWidth="1.6" />
          <path d="M45 141c0 3 3 4.6 4 6 1-1.4 4-3 4-6z" style={{ fill: ACCENT_2, opacity: 0.7 }} />
          <path d="M67 141c0 3 3 4.6 4 6 1-1.4 4-3 4-6z" style={{ fill: ACCENT_2, opacity: 0.7 }} />
        </g>

        <g>
          <path d="M22 84c-6 1.8-9.6 5-11 8.6" fill="none" stroke="url(#bt-metal)" strokeWidth="5.4" strokeLinecap="round" />
          <circle cx="10" cy="95" r="4.6" fill="url(#bt-metal)" stroke={ACCENT} strokeWidth="1.4" />
          <path d="M6.6 95l2.4 2.6 4.6-5" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M98 84c6 1.8 9.6 5 11 8.6" fill="none" stroke="url(#bt-metal)" strokeWidth="5.4" strokeLinecap="round" />
          <circle cx="110" cy="95" r="4.6" fill="url(#bt-metal)" stroke={ACCENT} strokeWidth="1.4" />
          <path d="M113.4 95l-2.4 2.6-4.6-5" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        <rect x="18" y="96" width="84" height="34" rx="15" fill="url(#bt-shell)" stroke={ACCENT} strokeWidth="2.2" />
        <path d="M18 104h84" stroke={ACCENT} strokeWidth="1" opacity="0.28" />
        <rect x="50" y="104" width="20" height="18" rx="7" fill="url(#bt-shell-dark)" stroke={ACCENT} strokeWidth="1.5" />
        <path d="M55 113h10" stroke={ACCENT_2} strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="29" cy="113" r="2.4" style={{ fill: ACCENT, opacity: 0.45 }} />
        <circle cx="91" cy="113" r="2.4" style={{ fill: ACCENT, opacity: 0.45 }} />

        <path d="M14 74c0-4 3.2-7.2 7.2-7.2h5.6v28h-5.6c-4 0-7.2-3.2-7.2-7.2z" fill="url(#bt-metal)" stroke={ACCENT} strokeWidth="1.8" />
        <circle cx="19" cy="86" r="3.4" fill="#ffffff" opacity="0.75" />
        <path d="M106 74c0-4-3.2-7.2-7.2-7.2h-5.6v28h5.6c4 0 7.2-3.2 7.2-7.2z" fill="url(#bt-metal)" stroke={ACCENT} strokeWidth="1.8" />
        <circle cx="101" cy="86" r="3.4" fill="#ffffff" opacity="0.75" />

        <rect x="14" y="30" width="92" height="72" rx="30" fill="url(#bt-shell)" stroke={ACCENT} strokeWidth="2.8" />
        <path
          d="M26 44c1.6-7.6 8-13 16-14.6"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.4"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path d="M20 86h80" stroke={ACCENT} strokeWidth="1" opacity="0.2" />
        <circle cx="24" cy="70" r="1.8" style={{ fill: INK, opacity: 0.18 }} />
        <circle cx="96" cy="70" r="1.8" style={{ fill: INK, opacity: 0.18 }} />
        <circle cx="24" cy="82" r="1.8" style={{ fill: INK, opacity: 0.18 }} />
        <circle cx="96" cy="82" r="1.8" style={{ fill: INK, opacity: 0.18 }} />

        <path
          d="M27 52c0-9.4 7.6-17 17-17h32c9.4 0 17 7.6 17 17v22c0 9.4-7.6 17-17 17H44c-9.4 0-17-7.6-17-17z"
          fill="url(#bt-visor)"
        />
        <g clipPath="url(#bt-visor-clip)">
          <path
            d="M34 42c5-5.6 12.4-8 20-7.4"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4.6"
            strokeLinecap="round"
            opacity="0.5"
          />
          <path d="M27 78h66" stroke="#ffffff" strokeWidth="0.9" opacity="0.22" />
        </g>
        <path
          d="M27 52c0-9.4 7.6-17 17-17h32c9.4 0 17 7.6 17 17v22c0 9.4-7.6 17-17 17H44c-9.4 0-17-7.6-17-17z"
          fill="none"
          stroke={ACCENT}
          strokeWidth="1.8"
          opacity="0.65"
        />

        <ellipse cx="26" cy="82" rx="8" ry="5.6" fill="url(#bt-cheek)" />
        <ellipse cx="94" cy="82" rx="8" ry="5.6" fill="url(#bt-cheek)" />
        <ellipse cx="26" cy="82" rx="4.4" ry="2.8" style={{ fill: BLUSH }} />
        <ellipse cx="94" cy="82" rx="4.4" ry="2.8" style={{ fill: BLUSH }} />

        <g style={eyeStyle}>
          <circle cx="44" cy="61" r="10.4" fill="#ffffff" />
          <circle cx="44" cy="61" r="10.4" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.35" />
          <g transform={`translate(${dx} ${dy})`}>
            <circle cx="44" cy="61" r="5.4" style={{ fill: INK }} />
            <circle cx="46" cy="58.4" r="2" fill="#ffffff" />
            <circle cx="42.4" cy="64" r="0.9" fill="#ffffff" opacity="0.7" />
          </g>
        </g>
        <g style={eyeStyle}>
          <circle cx="76" cy="61" r="10.4" fill="#ffffff" />
          <circle cx="76" cy="61" r="10.4" fill="none" stroke={ACCENT} strokeWidth="0.8" opacity="0.35" />
          <g transform={`translate(${dx} ${dy})`}>
            <circle cx="76" cy="61" r="5.4" style={{ fill: INK }} />
            <circle cx="78" cy="58.4" r="2" fill="#ffffff" />
            <circle cx="74.4" cy="64" r="0.9" fill="#ffffff" opacity="0.7" />
          </g>
        </g>

        <g
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity={browOpacity}
          transform={`translate(0 ${browLift})`}
        >
          <path d="M35.4 45.4c2.8-2.2 6-3.2 9.2-2.8" />
          <path d="M75.4 42.6c3.2-.4 6.4.6 9.2 2.8" />
        </g>

        {grin ? (
          <g>
            <path d="M48 78c3 8.6 21 8.6 24 0z" style={{ fill: INK }} />
            <path d="M53.6 84.4c2.6 2.8 10.2 2.8 12.8 0z" style={{ fill: '#f472b6' }} />
          </g>
        ) : (
          <path
            d="M50.6 79.4c3.4 3.8 15.4 3.8 18.8 0"
            fill="none"
            stroke={INK}
            strokeWidth="3"
            strokeLinecap="round"
          />
        )}

        <path d="M47 96h26l-4 4H51z" style={{ fill: ACCENT, opacity: 0.35 }} />
        <circle cx="60" cy="88" r="2.4" style={{ fill: ACCENT, opacity: 0.6 }} />
        </g>
      </g>
    </svg>
  )
})

export default Mascot