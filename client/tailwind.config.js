/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      maxWidth: {
      '6.5xl': '76rem',
    },
      colors : {
        'gray-850': "#1c2135",
      },
      fontSize: {
        '4.5xl': '2.6rem',
      },
    },
  },
  plugins: [typography],
}

