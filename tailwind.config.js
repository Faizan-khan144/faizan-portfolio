/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#faf9f7',
        surface: '#ffffff',
        'surface-2': '#f1f0ec',
        line: 'rgba(18, 18, 24, 0.1)',
        ink: '#17171d',
        muted: '#63606a',
        accent: '#ff4d2e',
        'accent-ink': '#ffffff',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        editorial: '72rem',
        content: '40rem',
      },
      letterSpacing: {
        wide2: '0.16em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(18,18,24,0.04), 0 8px 24px -12px rgba(18,18,24,0.12)',
        'card-hover': '0 2px 4px rgba(18,18,24,0.05), 0 20px 40px -16px rgba(18,18,24,0.2)',
      },
    },
  },
  plugins: [],
}