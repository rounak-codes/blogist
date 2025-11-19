/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
      '6.5xl': '76rem', // choose your size
    },
      colors : {
        'gray-850': "#1c2135",
      },
    },
  },
  plugins: [],
}

