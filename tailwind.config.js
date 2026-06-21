/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00F5FF',
        secondary: '#7C3AED',
        accent: '#00FF88',
        background: '#050816',
        text: '#FFFFFF',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'glow': {
          '0%, 100%': { 'text-shadow': '0 0 10px rgba(0, 245, 255, 0.5)' },
          '50%': { 'text-shadow': '0 0 20px rgba(0, 245, 255, 1)' },
        },
        'pulse-glow': {
          '0%, 100%': { 'box-shadow': '0 0 20px rgba(0, 245, 255, 0.3)' },
          '50%': { 'box-shadow': '0 0 30px rgba(0, 245, 255, 0.8)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('tailwindcss/plugin')(({ addBase, addComponents }) => {
      addBase({
        body: {
          backgroundColor: '#050816',
          color: '#FFFFFF',
        },
      });
      addComponents({
        '.glassmorphism': {
          '@apply bg-white/10 backdrop-blur-md border border-white/20 rounded-xl': {},
        },
        '.neon-glow': {
          '@apply shadow-[0_0_20px_rgba(0,245,255,0.5)]': {},
        },
        '.gradient-button': {
          '@apply bg-gradient-to-r from-primary via-secondary to-accent': {},
        },
      });
    }),
  ],
};
