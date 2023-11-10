/** @type {import('tailwindcss').Config} */
// tailwind.config.js

const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'my-color': '#C62A5B',
      },
    },
  },
  plugins: [],
};
