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
        "josefin-sans": ["var(--font-josefin-sans)"],
        "crimson-text": ["var(--font-crimson-text)"],
        "oleo-script-swash-caps": ["var(--font-oleo-script-swash-caps)"],
        "pinyon-script": ["var(--font-pinyon-script)"],
        "petit-formal-script": ["var(--font-petit-formal-script)"],
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
        background: "#151C25",
        accent: "#BEAD9A",
        primary: "#F6F5EB",
        secondary: "#807872",
      },
    }),
  ],
};
