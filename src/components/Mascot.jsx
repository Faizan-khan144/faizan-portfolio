import { forwardRef } from 'react'

const ACCENT = 'rgb(var(--color-accent))'
const ACCENT_2 = 'rgb(var(--color-accent-2))'
const SURFACE_2 = 'rgb(var(--color-surface-2))'
const SHADE = '#8f95bb'

const DARK = '#241f3d'

const SPIRAL =
  'M0 0c0-1.1 1.2-2 2.4-2c1.9 0 3.4 1.6 3.4 3.6c0 2.6-2.2 4.7-4.9 4.7c-3.7 0-6.7-3-6.7-6.8'

/**
 * Mochi — the portfolio companion.
 *
 * A chubby pear-shaped blob with oversized eyes, built for cuteness at any
 * size: head-heavy proportions, tiny features low on the face, big glossy
 * speculars and a soft radial-gradient body. Everything is SVG so it stays
 * crisp from 16px favicons up to hero size.
 *
 * Props:
 *   look={{x, y}}  pointer direction, -1..1, drives pupils + tilt
 *   blink          squashes eyes into happy arcs
 *   squish         squash-and-stretch on the whole body
 *   wave           raises the right arm
 *   grin           open laughing mouth
 *   mood           'happy' | 'idle' | 'surprised' | 'dizzy' | 'oops' | 'love'
 */
const Mascot = forwardRef(function Mascot(
  {
    size = 128,
    className = '',
    look = { x: 0, y: 0 },
    blink = false,
    squish = false,
    wave = false,
    grin = false,
    mood = 'happy',
    ...rest
  },
  ref,
) {
  const dx = look.x * 6.4
  const dy = look.y * 5.4
  const tilt = look.x * 8
  const lift = look.y * 2.4

  const dizzy = mood === 'dizzy'
  const surprised = mood === 'surprised'
  const oops = mood === 'oops'
  const love = mood === 'love'
  const idle = mood === 'idle'

  const eyeStyle = {
    transformBox: 'fill-box',
    transformOrigin: 'center',
    transform: blink ? 'scaleY(0.08)' : 'scaleY(1)',
    transition: 'transform 120ms cubic-bezier(.4,0,.2,1)',
  }

  const bodyTransform = squish
    ? 'translate(60 106) scale(1.16 0.82) translate(-60 -106)'
    : `rotate(${tilt} 60 70) translate(0 ${lift})`

  const eyeR = surprised ? 15 : dizzy ? 14 : 14
  const pupilR = surprised ? 6.4 : dizzy ? 0 : love ? 0 : 7.4

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 124"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Mochi, the portfolio companion"
      style={{ display: 'block', overflow: 'visible' }}
      {...rest}
    >
      <defs>
        <radialGradient id="mo-body" cx="0.34" cy="0.24" r="0.86">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="46%" stopColor="#fbfbfd" />
          <stop offset="76%" stopColor={SURFACE_2} />
          <stop offset="100%" stopColor={SHADE} />
        </radialGradient>
        <radialGradient id="mo-cheek" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ff8fbd" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#ff8fbd" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mo-tuft" x1="0" y1="1" x2="0.35" y2="0">
          <stop offset="0%" stopColor={ACCENT_2} />
          <stop offset="100%" stopColor="#a7f3d0" />
        </linearGradient>
        <linearGradient id="mo-belly" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={ACCENT} stopOpacity="0.14" />
          <stop offset="100%" stopColor={ACCENT} stopOpacity="0.02" />
        </linearGradient>
        <clipPath id="mo-clip">
          <rect x="16" y="18" width="88" height="92" rx="42" />
        </clipPath>
      </defs>

      <ellipse cx="60" cy="116" rx="27" ry="5" fill={DARK} opacity="0.14" />

      <g transform={bodyTransform} className={squish ? 'mo-squished' : undefined}>
        <g className="mo-tuft" style={{ transformOrigin: '60px 20px' }}>
          <path d="M60 21c-1.5-6 1.5-11 7-13.5c-.5 5-1.5 9 0 13.5z" fill="url(#mo-tuft)" />
          <circle cx="67" cy="7.5" r="3" fill="url(#mo-tuft)" />
        </g>

        <g className="mo-arm mo-arm-left" style={{ transformOrigin: '22px 74px' }}>
          <ellipse cx="17" cy="80" rx="8.5" ry="9.5" fill="url(#mo-body)" stroke={ACCENT} strokeWidth="1.6" strokeOpacity="0.35" />
        </g>
        <g
          className={`mo-arm mo-arm-right${wave ? ' is-waving' : ''}`}
          style={{ transformOrigin: '98px 74px' }}
        >
          <ellipse
            cx={wave ? 105 : 103}
            cy={wave ? 60 : 80}
            rx="8.5"
            ry="9.5"
            fill="url(#mo-body)"
            stroke={ACCENT}
            strokeWidth="1.6"
            strokeOpacity="0.35"
          />
        </g>

        <rect x="16" y="18" width="88" height="92" rx="42" fill="url(#mo-body)" />
        <rect x="16" y="18" width="88" height="92" rx="42" fill="none" stroke={ACCENT} strokeWidth="2" strokeOpacity="0.4" />

        <g clipPath="url(#mo-clip)">
          <ellipse cx="46" cy="42" rx="30" ry="23" fill="#ffffff" opacity="0.55" />
          <ellipse cx="60" cy="116" rx="52" ry="30" fill="url(#mo-belly)" />
        </g>

        <ellipse cx="33" cy="80" rx="11.5" ry="8" fill="url(#mo-cheek)" />
        <ellipse cx="87" cy="80" rx="11.5" ry="8" fill="url(#mo-cheek)" />
        <ellipse cx="33" cy="80" rx="6" ry="4" fill="#ff8fbd" opacity="0.5" />
        <ellipse cx="87" cy="80" rx="6" ry="4" fill="#ff8fbd" opacity="0.5" />

        {dizzy ? (
          <g fill="none" stroke={DARK} strokeWidth="2.6" strokeLinecap="round" opacity="0.85">
            <g transform={`translate(${44 + dx * 0.4} ${60 + dy * 0.4})`}>
              <path d={SPIRAL} />
            </g>
            <g transform={`translate(${76 + dx * 0.4} ${60 + dy * 0.4}) scale(-1 1)`}>
              <path d={SPIRAL} />
            </g>
          </g>
        ) : love ? (
          <g>
            <path d="M44 53.5c-2.6-4.6-9.4-3.6-9.4 2.2c0 4.6 6.2 8.6 9.4 11c3.2-2.4 9.4-6.4 9.4-11c0-5.8-6.8-6.8-9.4-2.2z" fill="#ff6fa8" />
            <path d="M76 53.5c-2.6-4.6-9.4-3.6-9.4 2.2c0 4.6 6.2 8.6 9.4 11c3.2-2.4 9.4-6.4 9.4-11c0-5.8-6.8-6.8-9.4-2.2z" fill="#ff6fa8" />
          </g>
        ) : (
          <>
            <g style={eyeStyle}>
              <circle cx="44" cy="60" r={eyeR} fill="#ffffff" />
              <circle cx="44" cy="60" r={eyeR} fill="none" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.35" />
              <g transform={`translate(${dx} ${dy})`}>
                <circle cx="44" cy="60" r={pupilR} fill={DARK} />
                <circle cx="46.8" cy="56.8" r="2.9" fill="#ffffff" />
                <circle cx="41.6" cy="63.6" r="1.2" fill="#ffffff" opacity="0.75" />
              </g>
            </g>
            <g style={eyeStyle}>
              <circle cx="76" cy="60" r={eyeR} fill="#ffffff" />
              <circle cx="76" cy="60" r={eyeR} fill="none" stroke={ACCENT} strokeWidth="1" strokeOpacity="0.35" />
              <g transform={`translate(${dx} ${dy})`}>
                <circle cx="76" cy="60" r={pupilR} fill={DARK} />
                <circle cx="78.8" cy="56.8" r="2.9" fill="#ffffff" />
                <circle cx="73.6" cy="63.6" r="1.2" fill="#ffffff" opacity="0.75" />
              </g>
            </g>
          </>
        )}

        {!blink && !dizzy && !love && (
          <g
            fill="none"
            stroke={DARK}
            strokeWidth="3"
            strokeLinecap="round"
            opacity={oops || surprised ? 0.9 : 0.72}
          >
            {oops ? (
              <>
                <path d="M36.5 43.5c3-2.4 6.6-3.4 10.2-3" />
                <path d="M73.5 40.5c3.6.4 7.2 1.4 10.2 3" />
              </>
            ) : idle ? (
              <>
                <path d="M37 44.5c3.4-1.6 6.8-1.6 10.2 0" />
                <path d="M72.8 44.5c3.4-1.6 6.8-1.6 10.2 0" />
              </>
            ) : (
              <>
                <path d="M36.5 43c3.6-2.4 7.4-2.4 11 0" />
                <path d="M72.5 43c3.6-2.4 7.4-2.4 11 0" />
              </>
            )}
          </g>
        )}

        {oops && (
          <g>
            <path d="M86 44c0-3.4 3-6.2 6.6-6.2c3.6 0 6.4 2.8 6.4 6.2c0 5.4-6.4 10.6-6.4 10.6s-6.6-5.2-6.6-10.6z" fill="#7dd3fc" opacity="0.85" />
          </g>
        )}

        {grin || surprised ? (
          <g>
            <path
              d={
                surprised
                  ? 'M53.5 84.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5s-2.9 8.5-6.5 8.5s-6.5-4.9-6.5-8.5z'
                  : 'M44 80c5 9.5 27 9.5 32 0z'
              }
              fill={DARK}
            />
            {!surprised && <path d="M51 86c3.4 3.6 14.6 3.6 18 0z" fill="#ff8fbd" />}
          </g>
        ) : oops ? (
          <path d="M52 89.5c5.4-3.4 10.6-3.4 16 0" fill="none" stroke={DARK} strokeWidth="3.4" strokeLinecap="round" />
        ) : (
          <path
            d={idle ? 'M53 86c4.6 1.6 9.4 1.6 14 0' : 'M51 83c5.6 6 12.4 6 18 0'}
            fill="none"
            stroke={DARK}
            strokeWidth="3.6"
            strokeLinecap="round"
          />
        )}

        <ellipse cx="60" cy="76" rx="2.4" ry="2" fill={ACCENT} opacity="0.5" />
      </g>
    </svg>
  )
})

export default Mascot