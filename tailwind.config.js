/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'very-dark-desaturated-blue': 'hsl(235, 24%, 19%)',
        'very-light-gray': 'hsl(0, 0%, 98%)',
        'light-grayish-blue': 'hsl(233, 11%, 84%)',
        'very-light-grayish-blue': 'hsl(236, 33%, 92%)',
        'dark-grayish-blue' : 'hsl(236, 9%, 61%)',
      },
      backgroundImage:{
        white: '#ffffff',
        gradient: 'linear-gradient(to right, hsl(192, 100%, 67%) ,hsl(280, 87%, 65%))',
        headerImage: "url('/images/bg-desktop-dark.jpg')",
        check: "url('./images/icon-check.svg'),linear-gradient(to right, hsl(192, 100%, 67%) ,hsl(280, 87%, 65%))",
      }
    },
  },
  plugins: [],
}

