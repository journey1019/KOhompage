import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
        spacing: {
            18: '4.5red', // 1rem = 16px, 4.5rem = 72px // top-18
        },
        screens: { // 해상도 조정
            smallMobile: '321px',
            mobile: '376px',
            bigMobile: '426px',
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            '2xl': '1441px',
            '3xl': '1751px',
            'maxWeb': '2001px',
        }
    },
  },
  plugins: [
      require('@tailwindcss/typography'),
      require('flowbite/plugin'),
      require('@tailwindcss/typography')
  ],
}
export default config