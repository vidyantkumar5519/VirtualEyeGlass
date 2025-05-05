/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customColor: "#025162",
        customBg :"#025162",
        customButton:"#025162",
        customText:"#8D3500",
      },
    },
  },
  plugins: [],
};
