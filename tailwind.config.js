/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // necessário para detectar classes Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
