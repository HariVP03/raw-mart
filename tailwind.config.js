module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  content: ["./pages/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["'Karla', sans-serif;"],
    },
  },
  plugins: [],
};
