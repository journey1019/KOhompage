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