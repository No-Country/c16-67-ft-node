/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx, js}', 'node_modules/flowbite-react/lib/esm/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        walter: ['Walter Turncoat', 'cursive'],
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        blackOpacity: '#0000007A',
        whiteSmoke: '#F2F2F2',
        primary: {
          50: '#fff2e6',
          100: '#F3CFB3',
          200: '#ffc38b',
          300: '#ffa755',
          400: '#ff9635',
          500: '#ff7c02',
          600: '#e87102',
          700: '#D7640B',
          800: '#8c4401',
          900: '#6b3401'
        },
        secondary: {
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
        error: {
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
        },
        Success: {
          50: '#eaf8eb',
          100: '#bde9c0',
          200: '#9ddea1',
          300: '#70cf76',
          400: '#55c55c',
          500: '#2ab733',
          600: '#26a72e',
          700: '#1e8224',
          800: '#17651c',
          900: '#124d15'
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
        paws: {
          '0% ': {
            transform: 'translateY(0) rotate(23deg)'
          },
          '100%': {
            transform: 'translateY(-100%) rotate(23deg)'
          }
        },
        appearOpen: {
          '0%': {
            transform: 'scale(0.5)',
            opacity: ' 0'
          },
          '50% ': {
            transform: 'scale(0.7)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        appearClose: {
          '0%': {
            transform: 'scale(1)',
            opacity: '1'
          },
          '75% ': {
            transform: 'scale(0.7)',
            opacity: '0.5'
          },
          '100%': {
            transform: 'scale(0)',
            opacity: '0'
          }
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
            transform: 'translateY(-110px)'
          }
        },
        fadeOutSelfClose: {
          '0%': {
            opacity: '1',
            transform: 'translateY(-110px)'
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(0)'
          }
        }
      },
      animation: {
        spin: 'spin 1.2s infinite linear',
        appear: 'appear 0.3s linear',
        increment: 'increment 1.2s infinite linear',
        appearOpen: 'appearOpen 0.2s linear',
        appearClose: 'appearClose 0.2s linear',
        paws: 'paws 5s linear infinite',
        petModalOpen: 'petModalOpen 0.2s linear',
        petModalClose: 'petModalClose 0.2s linear',
        fadeInSelfClose: 'fadeInSelfClose 0.2s ease-in forwards',
        fadeOutSelfClose: 'fadeOutSelfClose 0.2s ease-in forwards'
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
  plugins: [require('flowbite/plugin')]
};
