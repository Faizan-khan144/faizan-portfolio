/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0c',
        surface: '#101014',
        'surface-2': '#16161c',
        line: 'rgba(255, 255, 255, 0.08)',
        ink: '#f2f1ec',
        muted: '#a3a19c',
        accent: '#d9a85b',
        'accent-ink': '#1c1508',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        editorial: '70rem',
        content: '42rem',
      },
      letterSpacing: {
        wide2: '0.18em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}