/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#050B1F',
          darker: '#02050E',
          surface: '#0A1330',
          surface2: '#101D42',
          surface3: '#152554',
          blue: '#087BFF',
          cyan: '#00D9FF',
          orange: '#FF6A00',
          orangeGlow: '#FFA000',
          green: '#00D68F',
          red: '#FF4057',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 25px rgba(8, 123, 255, 0.45)',
        'neon-cyan': '0 0 25px rgba(0, 217, 255, 0.5)',
        'neon-orange': '0 0 25px rgba(255, 106, 0, 0.45)',
      },
    },
  },
  plugins: [],
};
