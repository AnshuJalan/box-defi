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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
