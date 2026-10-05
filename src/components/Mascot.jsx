import { forwardRef } from 'react'

const ACCENT = 'rgb(var(--color-accent))'
const ACCENT_2 = 'rgb(var(--color-accent-2))'
const SURFACE_2 = 'rgb(var(--color-surface-2))'

const SHADE = '#9aa0c4'

/**
 * "Mochi" — a soft blob friend for the FZ portfolio.
 *
 * Squircle body, two big eyes projected on a sphere so they track the
 * pointer, tiny waving arms and a bobbing topknot. Drawn as pure SVG
 * with radial gradients for the soft 3D read — no images.
 *
 * Props:
 *   look={{ x, y }}  pointer direction, -1..1
 *   blink            squashes the eyes into happy arcs
 *   grin             open smiling mouth
 *   wave             raises the right arm
 *   mood             'happy' | 'idle' | 'surprised'
 */
const Mascot = forwardRef(function Mascot(
  {
    size = 128,
    className = '',
    look = { x: 0, y: 0 },
    blink = false,
    grin = false,
    wave = false,
    mood = 'happy',
    ...rest
  },
  ref,
) {
  const dx = look.x * 5.2
  const dy = look.y * 4.4
  const tilt = look.x * 7
  const squash = look.y * 1.6

  const eyeStyle = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transform: blink ? 'scaleY(0.1)' : 'scaleY(1)',
    transition: 'transform 110ms ease',
  }

  const surprised = mood === 'surprised'
  const idle = mood === 'idle'

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Mochi, the portfolio mascot"
      style={{ display: 'block', overflow: 'visible' }}
      {...rest}
    >
      <defs>
        <radialGradient id="mochi-body" cx="0.36" cy="0.28" r="0.82">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="52%" stopColor={SURFACE_2} />
          <stop offset="100%" stopColor={SHADE} />
        </radialGradient>
        <radialGradient id="mochi-cheek" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff9ec4" stopOpacity="0.62" />
          <stop offset="100%" stopColor="#ff9ec4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mochi-shine" cx="0.4" cy="0.32" r="0.6">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mochi-tuft" x1="0" y1="1" x2="0.4" y2="0">
          <stop offset="0%" stopColor={ACCENT_2} />
          <stop offset="100%" stopColor={ACCENT} />
        </linearGradient>
        <clipPath id="mochi-clip">
          <rect x="18" y="20" width="84" height="84" rx="30" />
        </clipPath>
      </defs>

      <ellipse cx="60" cy="109" rx="26" ry="4.6" style={{ fill: '#0b0b14', opacity: 0.12 }} />
      <ellipse cx="60" cy="108" rx="15" ry="2.4" style={{ fill: ACCENT, opacity: 0.22 }} />

      <g className="mochi-topknot" style={{ transformOrigin: '60px 22px' }}>
        <path d="M60 22c-2-7 1-12 6-14-1 5-2 9-1 14z" fill="url(#mochi-tuft)" />
      </g>

      <g transform={`rotate(${tilt} 60 66) scale(${1 + squash / 900} ${1 - squash / 900})`}>
        <g className="mochi-arm mochi-arm-left">
          <path
            d="M24 62c-6 1-9 5-10 10"
            fill="none"
            stroke={SURFACE_2}
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          <circle cx="13" cy="74" r="5.4" fill="url(#mochi-body)" />
        </g>

        <g className={`mochi-arm mochi-arm-right${wave ? ' is-waving' : ''}`} style={{ transformOrigin: '96px 62px' }}>
          <path
            d={wave ? 'M96 60c7-4 10-11 8-19' : 'M96 62c6 1 9 5 10 10'}
            fill="none"
            stroke={SURFACE_2}
            strokeWidth="8.5"
            strokeLinecap="round"
          />
          <circle cx={wave ? 103 : 107} cy={wave ? 41 : 74} r="5.4" fill="url(#mochi-body)" />
        </g>

        <rect x="18" y="20" width="84" height="84" rx="30" fill="url(#mochi-body)" />
        <rect
          x="18"
          y="20"
          width="84"
          height="84"
          rx="30"
          fill="none"
          stroke={ACCENT}
          strokeWidth="2.2"
          opacity="0.5"
        />

        <g clipPath="url(#mochi-clip)">
          <ellipse cx="45" cy="40" rx="26" ry="20" fill="url(#mochi-shine)" />
          <ellipse cx="34" cy="84" rx="17" ry="12" fill={ACCENT} opacity="0.1" />
        </g>

        <ellipse cx="34" cy="76" rx="10" ry="7.4" fill="url(#mochi-cheek)" />
        <ellipse cx="86" cy="76" rx="10" ry="7.4" fill="url(#mochi-cheek)" />
        <ellipse cx="34" cy="76" rx="5.4" ry="3.6" fill="#ff9ec4" opacity="0.42" />
        <ellipse cx="86" cy="76" rx="5.4" ry="3.6" fill="#ff9ec4" opacity="0.42" />

        <g style={eyeStyle}>
          <circle cx="45" cy="58" r={surprised ? 13 : 11.4} fill="#ffffff" />
          <circle cx="45" cy="58" r={surprised ? 13 : 11.4} fill="none" stroke={ACCENT} strokeWidth="0.9" opacity="0.3" />
          <g transform={`translate(${dx} ${dy})`}>
            <circle cx="45" cy="58" r={surprised ? 7.2 : 6} fill="#22223a" />
            <circle cx="47.4" cy="55.4" r="2.3" fill="#ffffff" />
            <circle cx="43" cy="60.8" r="1" fill="#ffffff" opacity="0.7" />
          </g>
        </g>

        <g style={eyeStyle}>
          <circle cx="75" cy="58" r={surprised ? 13 : 11.4} fill="#ffffff" />
          <circle cx="75" cy="58" r={surprised ? 13 : 11.4} fill="none" stroke={ACCENT} strokeWidth="0.9" opacity="0.3" />
          <g transform={`translate(${dx} ${dy})`}>
            <circle cx="75" cy="58" r={surprised ? 7.2 : 6} fill="#22223a" />
            <circle cx="77.4" cy="55.4" r="2.3" fill="#ffffff" />
            <circle cx="73" cy="60.8" r="1" fill="#ffffff" opacity="0.7" />
          </g>
        </g>

        {!blink && (
          <g
            fill="none"
            stroke="#22223a"
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity={idle ? 0.4 : surprised ? 0.85 : 0.7}
            transform={surprised ? 'translate(0 -3)' : undefined}
          >
            <path d={idle ? 'M37.5 42.5c3.5-1.4 6.5-1.4 9.5 0' : 'M37.5 41c3.5-2 7-2 10 0'} />
            <path d={idle ? 'M72.5 42.5c3.5-1.4 6.5-1.4 9.5 0' : 'M72.5 41c3.5-2 7-2 10 0'} />
          </g>
        )}

        {grin || surprised ? (
          <g>
            <path
              d={surprised ? 'M54.5 80c0-3 2.5-5 5.5-5s5.5 2 5.5 5-2.5 7-5.5 7-5.5-4-5.5-7z' : 'M47 76c4.5 8 21.5 8 26 0z'}
              fill="#22223a"
            />
            {!surprised && <path d="M53 81.4c3 3 11 3 14 0z" fill="#ff8fb8" />}
          </g>
        ) : (
          <path
            d={idle ? 'M52 80c5 1.6 11 1.6 16 0' : 'M51 77.4c5.6 5.4 12.4 5.4 18 0'}
            fill="none"
            stroke="#22223a"
            strokeWidth="3.4"
            strokeLinecap="round"
          />
        )}
      </g>
    </svg>
  )
})

export default Mascot