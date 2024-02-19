/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx, js}'],
  theme: {
    extend: {
      fontFamily: {
        walter: ['Walter Turncoat', 'cursive']
      },
      colors: {
        primary: {
          100: '#C7E4C3',
          200: '#85C47D',
          300: '#4E9745',
          400: '#2A5125',
          500: '#050B05'
        },
        secondary: {
          100: '#DD8441',
          200: '#C76A24',
          300: '#6F3B14',
          400: '#45250C',
          500: '#1A0E05'
        },
        accent: {
          100: '#FFE5AD',
          200: '#FFC447',
          300: '#E29900',
          400: '#7A5300',
          500: '#140E00'
        }
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        increment: {
          '0%': { width: '20px' },
          '50%': { width: '40px' },
          '100%': { width: '60px' }
        },
        top: {
          '0%': { marginBottom: '-420px' },
          '50%': { marginBottom: '-280px' },
          '100%': { marginBottom: '-140px' }
        },
        petModalOpen: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        },
        petModalClose: {
          '100%': { transform: 'translateY(100%)' },
          '0%': { transform: 'translateY(0)' }
        },
        fadeInSelfClose: {
          '0%': {
            opacity: '0',
            transform: 'translateY(0)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(-40px)'
          }
        },
        fadeOutSelfClose: {
          '0%': {
            opacity: '1',
            transform: 'translateY(-40px)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        spin: 'spin 1.2s infinite linear',
        increment: 'increment 1.2s infinite linear',
        top: 'top 2s linear',
        petModalOpen: 'petModalOpen 0.5s linear',
        petModalClose: 'petModalClose 0.5s linear',
        fadeInSelfClose: 'fadeInSelfClose 0.5s ease-in forwards',
        fadeOutSelfClose: 'fadeOutSelfClose 0.5s ease-in forwards'
      }
    }
  },
  plugins: []
};
