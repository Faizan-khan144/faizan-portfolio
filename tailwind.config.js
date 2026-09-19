/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#060608',
        surface: '#0b0b10',
        surface2: '#121319',
        line: 'rgba(255,255,255,0.09)',
        ink: '#eaeaf0',
        muted: '#90909c',
        accent: '#4ade80',
        amber: '#fbbf24',
        cyan: '#22d3ee',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        float: 'float 7s ease-in-out infinite',
        bootBar: 'bootBar 1.4s ease-in-out infinite',
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
        bootBar: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(250%)' },
        },
      },
    },
  },
  plugins: [],
}