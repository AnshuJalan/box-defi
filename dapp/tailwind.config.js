// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
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
