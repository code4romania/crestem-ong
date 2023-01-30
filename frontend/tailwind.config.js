module.exports = {
  content: ['./src/components/**/*.{tsx}', './src/pages/**/*.{tsx}'],
  purge: [],
  theme: {
    colors: {
      'black': '#000000',
      'white': '#ffffff',
      'gray': {
        200: '#E5E7EB',
        400: '#9CA3AF',
        500: '#6B7280'
      },
      'green': '#047B7D',
      'green-hover': '#005E60',
      'secondary-green': '#688F23',
    },
    extend: {}
  },
  variants: {},
  plugins: []
};
