/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        '1primary': 'hsl(190,42%,67%)',
        'primary-item': 'hsl(191,50%,49%)',
        'primary-bg': 'hsl(192,55%,72%)',
        'primary-nav': 'hsl(192,45%,47%)',
      },
    },
  },
  plugins: [],
};
