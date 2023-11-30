/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'sage-green': '#d7e4c2',
        'koi-red': '#fd2e5f',
        'cream': '#fffef4',
        'light-green': '#9db445',
        'teal': '#376f5c',
        'sakura-pink': '#eb80a8',
        'pastel-orange': '#fcdaba',
        'pastel-pink': '#ffe3ed',
      },
      screens: {
        'mobile': {'max': '575px'},
        'tablet': {'min': '576px', 'max': '1151px'}
      }
    },
  },
  plugins: [],
}
