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
  plugins: [
      require(
          '@tailwindcss/typography',
          '@tailwindcss/forms', // Main/SubscribeSection
          '@tailwindcss/aspect-ratio' // Hardware/Products
      ),
    function ({ addComponents }) { // CarouselSolutions/SolutionCarousel.tsx (className="custom-dot-list")
      addComponents({
        '.custom-dot-list': {
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '50px !important',
          margin: '0',
        },
        '.custom-dot-list .react-multiple-carousel-dot': {
          backgroundColor: '#ccc',
          borderRadius: '50%',
          width: '10px',
          height: '10px',
          margin: '0 5px',
          cursor: 'pointer',
        },
        '.custom-dot-list .react-multiple-carousel-dot--active': {
          backgroundColor: '#000',
        },
      });
    },
  ],
}

