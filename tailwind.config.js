/** @type {import('tailwindcss').Config} */
// tailwind.config.js

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    
  ],
  theme: {
    extend: {
      colors: {
        "my-color": "#C62A5B",
      },
      zIndex: {
        '1000': '1000', // 더 높은 z-index 값 추가
      }
    },
  },
  
};
