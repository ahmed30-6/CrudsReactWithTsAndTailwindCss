/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  corePlugins: {
    appearance: true, 
  },
  corePlugins: {
    textSizeAdjust: false, 
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
