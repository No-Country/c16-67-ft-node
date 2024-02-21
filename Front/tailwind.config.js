/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx, js}'],
  theme: {
    extend: {
      fontFamily: {
        walter: ['Walter Turncoat', 'cursive'],
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        primary: {
          50: '#eaf8f2',
          100: '#bde9d6',
          200: '#9ddec2',
          300: '#70cfa6',
          400: '#55c695',
          500: '#2ab87a',
          600: '#26a76f',
          700: '#1e8357',
          800: '#176543',
          900: '#124d33'
        },
        secondary: {
          50: '#f1ebe8',
          100: '#d2c2b6',
          200: '#bda593',
          300: '#9f7c62',
          400: '#8c6243',
          500: '#6f3b14',
          600: '#653612',
          700: '#4f2a0e',
          800: '#3d200b',
          900: '#2f1908'
        },
        accent: {
          50: '#fcf5e6',
          100: '#f6dfb0',
          200: '#f2d08a',
          300: '#ecbb54',
          400: '#e8ad33',
          500: '#e29900',
          600: '#ce8b00',
          700: '#a06d00',
          800: '#7c5400',
          900: '#5f4000'
        },
        red: {
          50: '#fce6e6',
          100: '#f5b0b0',
          200: '#f18a8a',
          300: '#ea5454',
          400: '#e63333',
          500: '#e00000',
          600: '#cc0000',
          700: '#9f0000',
          800: '#7b0000',
          900: '#5e0000'
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
      },
      fontSize: {
        'body-lg': ['16px', '24px'],
        'body-md': ['14px', '20px'],
        'body-sm': ['12px', '16px'],
        'label-lg': ['14px', '20px'],
        'label-md': ['12px', '16px'],
        'label-sm': ['11px', '16px'],
        'title-lg': ['22px', '28px'],
        'title-md': ['16px', '24px'],
        'title-sm': ['14px', '20px'],
        'headline-lg': ['32px', '40px'],
        'headline-md': ['28px', '36px'],
        'headline-sm': ['24px', '32px'],
        'display-lg': ['57px', '64px'],
        'display-md': ['45px', '52px'],
        'display-sm': ['36px', '44px']
      }
    }
  },
  plugins: []
};
