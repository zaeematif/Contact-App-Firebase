/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#986FCC',
      'contact' : '#d0b0ee',
      'yellow': '#ffc000',
      'background': "#39294C",
      'red': '#ff4436'
    },
  },
  plugins: [],
}

