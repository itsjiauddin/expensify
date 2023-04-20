/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.js", "./app/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary: {
          1: "#bbf7d0",
          2: "#22c55e",
          3: "#facc15",
        },
      },
    },
  },
  plugins: [],
};
