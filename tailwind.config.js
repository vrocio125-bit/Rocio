import { brand } from './src/config/brand.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: brand.colors.navy,
        intense: brand.colors.intense,
        sky: brand.colors.sky,
        accent: brand.colors.accent,
        ink: brand.colors.ink,
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 20px 60px -20px rgba(29,183,244,.45)',
        card: '0 10px 40px -12px rgba(7,59,135,.18)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        bubble: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: 0 },
          '10%': { opacity: 0.7 },
          '100%': { transform: 'translateY(-110vh) scale(1.3)', opacity: 0 },
        },
        wave: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        bubble: 'bubble linear infinite',
        wave: 'wave 18s linear infinite',
      },
    },
  },
  plugins: [],
};
