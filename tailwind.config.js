const colors = require('./projects/slideshow-lib/src/styles/colors');

module.exports = {
  content: [
    "./projects/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors: colors.COLOR_PALETTE
    },
  },
  plugins: [],
}

