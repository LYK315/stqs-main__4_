/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030", //151030
        "black-100": "#232E30", //100d25
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
    },
  },
  plugins: [],
}
