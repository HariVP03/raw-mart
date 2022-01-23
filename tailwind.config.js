module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  content: ["./pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#18191A",
        secondary: "#242526",
        search: "#090A11",
        highlight: "#60a5fa",
      },
      fontFamily: {
        sans: "'Karla', sans-serif;",
        logo: "'Cabin', sans-serif;",
      },
    },
  },
  plugins: [],
};
