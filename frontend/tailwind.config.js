/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
darkMode: 'class', //Enables dark mode based on class
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      textColor: ['dark'],
      backgroundColor: ['dark'],
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
};
