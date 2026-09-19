/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#08080b',
        surface: '#0e0e13',
        surface2: '#16161c',
        line: 'rgba(255,255,255,0.09)',
        ink: '#f2f2f7',
        muted: '#9a9aa6',
        accent: '#10b981',
        cyan: '#22d3ee',
        violet: '#8b5cf6',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        float: 'float 7s ease-in-out infinite',
        spinSlow: 'spin 16s linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}