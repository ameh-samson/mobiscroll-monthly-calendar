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
        'light-gray': '#F7F7F7',
        "gray-300": "#CCCCCC",
        "black": "#000000"
      },
    },
  },
  plugins: [],
}