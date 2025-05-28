/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-zodiac': '#122C4F',
        'citrine-white': '#FBF9E3',
        'golden-dream': '#F0D637',
        'hippie-blue': '#5B88B2',
      },
    },
  },
  plugins: [],
};