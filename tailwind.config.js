/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4CFF',
        secondary: '#FF6B6B', 
        accent: '#4ECDC4',
        surface: '#F8F9FA',
        background: '#FFFFFF',
        success: '#51CF66',
        warning: '#FFD93D',
        error: '#FF6B6B',
        info: '#339AF0',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: { 
        display: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui'], 
        heading: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui'] 
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spring': 'spring 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      keyframes: {
        spring: {
          '0%': { transform: 'scale(0.8)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' }
        }
      },
      boxShadow: {
        'elevation': '0 2px 4px rgba(0,0,0,0.1)',
        'elevation-hover': '0 4px 12px rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
}