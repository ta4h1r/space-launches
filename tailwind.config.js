/** @type {import('tailwindcss').Config} */
export default {
  content: ["./pages/**", "./components/**", "./store/**"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
