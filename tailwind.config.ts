import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#D4A574',
          navy: '#001F3F',
          sand: '#F5F5F5',
          ink: '#333333'
        }
      },
      boxShadow: {
        soft: '0 18px 60px rgba(0, 31, 63, 0.10)',
        glow: '0 12px 40px rgba(212, 165, 116, 0.28)',
        card: '0 12px 30px rgba(0, 31, 63, 0.08)'
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'sans-serif'],
        display: ['var(--font-cormorant)', 'serif']
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at top left, rgba(212,165,116,0.32), transparent 28%), radial-gradient(circle at top right, rgba(255,255,255,0.14), transparent 24%), linear-gradient(135deg, #001F3F 0%, #002B55 48%, #001629 100%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -14px, 0)' }
        },
        blob: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '33%': { transform: 'translate3d(18px, -20px, 0) scale(1.08)' },
          '66%': { transform: 'translate3d(-12px, 18px, 0) scale(0.96)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' }
        }
      },
      animation: {
        float: 'float 10s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite'
      }
    }
  },
  plugins: []
}

export default config
