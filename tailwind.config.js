/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: "#FFD700",
          600: "#FFC700",
        },
        navy: {
          900: "#0B1E3F",
        },
      },
    },
  },
  plugins: [],
}


