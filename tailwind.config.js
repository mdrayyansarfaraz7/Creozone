/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slowBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '60%': { transform: 'translateY(-20px)' },
        },
        slowFloatX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(30px)' },
        },
      },
      animation: {
        slowBounce: 'slowBounce 4s ease-in-out infinite',
        slowFloatX: 'slowFloatX 4s ease-in-out infinite',
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
