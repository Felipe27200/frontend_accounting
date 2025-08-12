/** @type {import('tailwindcss').Config} */
module.exports = {
  // ...
  content: [
    "./src/**/*.{html,ts}", // Your HTML and TypeScript files
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')]
};

