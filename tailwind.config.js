/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        piloup: "var(--background)",
        primary: "var(--background-primary)",
        secondary: "var(--background-secondary)",
      },
    },
  },
  plugins: [],
};
