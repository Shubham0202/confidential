/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      minWidth:{
        promptSize:'600px',
        'mobile-prompt-size':'95%',
      },
      minHeight:{
      
      },
      colors:{
        'transparent-black': '#0000005f',
      }
    },
  },
  plugins: [],
}

