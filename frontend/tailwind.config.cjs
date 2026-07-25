/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F5732C',
          orangeDark: '#E5631D',
          peach: '#FDECE0',
          peachLight: '#FFF6F0',
        },
        ink: {
          900: '#1B2333',
          700: '#2E3648',
          500: '#6B7280',
        },
        border: {
          light: '#EDEDED',
        },
      },
      borderRadius: {
        xl2: '1rem',
      },
       height: {
        18: '4.5rem',                  
      },
      spacing: {
        18: '4.5rem',                  
      },
    },
  },
  plugins: [],
};
