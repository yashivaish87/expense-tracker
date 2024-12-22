/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      maxHeight: {
        '96': '10rem', 
      },
    },
  },
  plugins: [],
}

