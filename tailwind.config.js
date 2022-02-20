const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['"Assistant"', ...fontFamily.sans], // make assistant the default font
      hour: ['"roboto"'],
    },
    extend: {
      boxShadow: {
        theme: '4px 4px 0 0',
      },
      colors: {
        primary: colors.sky,
        gray: colors.gray,
        event: colors.rose,
        change: colors.amber,
        celebration: colors.lime,
        uiPrimary: colors.zinc,
      },
    },
  },
  plugins: [],
}
