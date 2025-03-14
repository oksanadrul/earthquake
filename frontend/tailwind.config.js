// tailwind.config.js

const { heroui } = require('@heroui/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}', // Paths to your Next.js pages
    './components/**/*.{js,ts,jsx,tsx}', // Paths to your components
    './app/**/*.{js,ts,jsx,tsx}', // Paths to Next.js 13+ app directory
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}', // HeroUI theme path
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // Enable dark mode via class
  plugins: [
    heroui({
      addCommonColors: true, // Add common colors for HeroUI
    }),
  ],
};
