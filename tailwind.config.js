/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fdfbf6',
          100: '#f9f4e9',
          200: '#f1e8d5',
          300: '#e7d8ba',
        },
        forest: {
          50: '#f1f6f1',
          100: '#dcebdd',
          200: '#bcd7be',
          300: '#92bd95',
          400: '#63a067',
          500: '#43844a',
          600: '#326a39',
          700: '#2a552f',
          800: '#244429',
          900: '#1f3823',
        },
        clay: {
          50: '#fbf1ea',
          100: '#f4ddcd',
          200: '#e8b99e',
          300: '#dc9670',
          400: '#d17b4f',
          500: '#c2683f',
          600: '#a8512d',
          700: '#883f24',
        },
        ink: '#2e2a23',
      },
      boxShadow: {
        soft: '0 12px 30px -12px rgba(46, 42, 35, 0.18)',
        lift: '0 22px 40px -16px rgba(36, 68, 41, 0.30)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
