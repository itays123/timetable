module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        theme: "4px 4px 0 0",
      },
      fontFamily: {
        body: ['"Assistant"'],
      },
      fontSize: {
        body: "1rem",
      },
      fontWeight: {
        body: "600",
      },
    },
  },
  plugins: [],
};
