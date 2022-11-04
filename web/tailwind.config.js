/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },

      backgroundImage: {
        app: 'url(/app-bg.png)',
      }
    },

    colors: {
      gray: {
        900: '#121214',
        800: '#282824',
        600: '#323238',
        300: '#8D8D99',
        100: '#e1e1e6',
      },
      white: {
        900: '#ffffff',
      },
      yellow: {
        500: '#F7DD43',
        700: '#A89629',
      },
      ignite: {
        500: '#129E57',
      }
    }
  },
  plugins: [],
}
