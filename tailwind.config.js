/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f7f7f4',
        surface: '#ffffff',
        surface2: '#efefeb',
        line: 'rgba(20,20,24,0.1)',
        ink: '#141417',
        muted: '#5c5c63',
        accent: '#4f46e5',
        cyan: '#14b8a6',
        pink: '#ec4899',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        floatSlow: 'float 11s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
      },
    },
  },
  plugins: [],
}