/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,jsx, js}'],
  theme: {
    extend: {},
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
      }
    },
    animation: {
      spin: 'spin 1.2s infinite linear',
      increment: 'increment 1.2s infinite linear'
    }
  },
  plugins: []
};
