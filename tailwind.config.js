/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "selector",
  theme: {
    extend: {
      colors : {
        "dark-bg" : "#660066",
        "dark-2" : "#86CB92"
        // "dark-bg" : "#a129ff"
      }
    },
  },
  plugins: [],
}