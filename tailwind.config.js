/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#152238",
        "bor-in": "#E4DFDF",
        "text-col": "#152238",
        "text-vents": "#123499",
        "select-green" : "#1A8917",
        "select-gray" : "#F2F2F2"
      },
    },
    fontFamily: {
      abel: ["Abel", "sans-serif"],
      inter: ['Inter', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
};

/*

*/
