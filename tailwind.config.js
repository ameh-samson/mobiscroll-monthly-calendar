/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue': '#007aff',
        'mutedBlue': '#253849',
        'gray300': '#CCCCCC',
        'lightGray': '#F7F7F7',
      },
    },
  },
  plugins: [],
}