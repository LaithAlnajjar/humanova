/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,jsx,js}"
  ],
  theme: {
    extend: {
      colors: {
        humanova: {
          olive: "#556B2F",
          oliveDark: "#3B4B21",
          cream: "#EAD8B1",
          gold: "#C2A878"
        }
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        cairo: ["Cairo", "sans-serif"]
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};
