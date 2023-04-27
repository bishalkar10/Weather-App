/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./*.{html,js}'],
  theme: {

    extend: {
      screens: {
        'mobile': { 'max': '420px' },
        // ...
      },
    },
  },
  plugins: [],
}

