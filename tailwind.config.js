const { createThemes } = require("tw-colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "crimson-text": ["var(--font-crimson-text)"],
        "eb-garamond": ["var(--font-eb-garamond)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    createThemes({
      dark: {
        background: "#151C25",
        accent: "#BEAD9A",
        primary: "#F6F5EB",
        secondary: "#807872",
      },
      light: {
        background: "#F6F5EB",
        accent: "#BEAD9A",
        primary: "#151C25",
        secondary: "#807872",
      },
    }),
  ],
};
