/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './public/**/*.html',
  ],
  darkMode: 'class',  // Enables manual dark mode toggling (e.g., via JS class on <html>)
  theme: {
    extend: {
      colors: {
        primary: '#0066cc',    // Deep blue for accents (links, buttons)
        secondary: '#4d94ff',  // Lighter blue for hover states or dark mode accents
        background: '#ffffff', // Light mode background
        'background-dark': '#121212', // Dark mode background
        text: '#333333',       // Light mode text
        'text-dark': '#e0e0e0', // Dark mode text
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    // require('@tailwindcss/typography'), // Uncomment if using Markdown/MDX prose
  ],
};
