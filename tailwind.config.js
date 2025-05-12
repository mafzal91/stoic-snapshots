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
    require("@tailwindcss/forms"),
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

      "rustic-sunrise": {
        background: "#F3F4ED",
        accent: "#536162",
        primary: "#424642",
        secondary: "#C06014",
      },
      "rustic-sunset": {
        background: "#1F201D",
        accent: "#A4B0B1",
        primary: "#FF9025",
        secondary: "#71776E",
      },

      "soft-whisper": {
        background: "#F6F6F6",
        accent: "#FFE2E2",
        primary: "#CC7373",
        secondary: "#AAAAAA",
      },
      "shadowed-embrace": {
        background: "#1E1E1E",
        accent: "#552525",
        primary: "#A93C3C",
        secondary: "#888888",
      },

      "celestial-delight": {
        background: "#8294C4",
        accent: "#FFEAD2",
        primary: "#FFEAD2",
        secondary: "#DBDFEA",
      },
      "dusk-serenade": {
        background: "#2B3749",
        accent: "#4E5478",
        primary: "#C1B890",
        secondary: "#6E728F",
      },

      "deep-plum": {
        background: "#00005C",
        accent: "#C060A1",
        primary: "#F0CAA3",
        secondary: "#C060A1",
      },
      "nightfall-noir": {
        background: "#050529",
        accent: "#8D366F",
        primary: "#D1A77D",
        secondary: "#8D366F",
      },

      "peaches-and-cream": {
        background: "#FFF3E2",
        accent: "#FA9884",
        primary: "#E74646",
        secondary: "#FA9884",
      },

      "terra-cotta-dreams": {
        background: "#EFF5F5",
        accent: "#497174",
        primary: "#EB6440",
        secondary: "#497174",
      },
    }),
  ],
};
