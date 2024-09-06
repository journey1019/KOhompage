/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using 'src' directory
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // darkMode: 'class',
  darkMode: 'selector',
  theme: {
    extend: {
      brightness: {
        '30': '.3',
        '60': '.6',
        '70': '.7',
        '80': '.8' // 클수록 밝음
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

