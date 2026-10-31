/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          royal: '#1200AC',
          mint: '#84FEC5',
          steel: '#589BBA',
          gradientBlue: '#415BAB',
          grey: '#7F7F7F',
          lightBg: '#F5F7FA',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
