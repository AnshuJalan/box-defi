// tailwind.config.js
module.exports = {
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    options: {
      safelist: ["bg-bgElderGrape", "bg-bgMangrot", "bg-bgSpotBerry", "bg-bgBlueStripe", "bg-bgCrownApple"],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      primary: ["Exo", "sans-serif"],
      secondary: ['"Exo 2"', "sans-serif"],
    },
    extend: {
      colors: {
        bgBlue: "#7E8CD4",
        bgGreen: "#BBEBB7",
        bgGreen2: "#B1E0BB",
        bgBrown: "#E0BB9B",
        bgOrange: "#FF9A00",
        bgElderGrape: "#8FFCD2",
        bgMangrot: "#0BF7D2",
        bgSpotBerry: "#F14493",
        bgBlueStripe: "#F7AE0F",
        bgCrownApple: "#F0FF44",
        fadedBlack: "#5A5A5A",
        fadedWhite: "#E5E5E5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
