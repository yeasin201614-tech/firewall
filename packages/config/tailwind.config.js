/** @type {import('tailwindcss').Config} */
module.exports = {
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
          border: 'rgba(8, 123, 255, 0.25)',
          borderBright: 'rgba(0, 217, 255, 0.5)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 25px rgba(8, 123, 255, 0.45)',
        'neon-cyan': '0 0 25px rgba(0, 217, 255, 0.5)',
        'neon-orange': '0 0 25px rgba(255, 106, 0, 0.45)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #050B1F 0%, #08163D 50%, #030816 100%)',
        'shield-glow': 'radial-gradient(circle at 50% 30%, rgba(8, 123, 255, 0.25) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};
