/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070708',
          900: '#0b0c0e',
          850: '#101216',
          800: '#15181e',
          700: '#1d2128',
          600: '#262b34',
          500: '#363c47',
          400: '#565d6b',
          300: '#828b9c',
          200: '#aab2c0',
          100: '#d6dbe4',
        },
        gold: {
          50: '#fff9ec',
          100: '#fdeec4',
          200: '#f7d98a',
          300: '#efbf52',
          400: '#e7a72c',
          500: '#d18a16',
          600: '#a8690f',
          700: '#7e4d0c',
          800: '#543208',
          900: '#2c1b05',
        },
        accent: {
          400: '#3dd6c0',
          500: '#16b8a3',
          600: '#0d8f80',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Unbounded"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(231,167,44,0.45)',
        'glow-accent': '0 0 40px -10px rgba(29,214,192,0.4)',
        card: '0 20px 60px -20px rgba(0,0,0,0.7)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.5s ease both',
        shimmer: 'shimmer 2.5s linear infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseRing: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.08)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
