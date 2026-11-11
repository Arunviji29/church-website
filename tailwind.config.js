/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e3a5f',
          dark: '#162b47',
          light: '#2c4f7c',
          pale: '#e8eef5',
        },
        gold: {
          DEFAULT: '#c9a14a',
          dark: '#a8843a',
          light: '#e3c88a',
          pale: '#f7efdc',
        },
        cream: '#faf8f4',
        ink: '#2a2f36',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px rgba(30, 58, 95, 0.08)',
        'card-hover': '0 12px 32px rgba(30, 58, 95, 0.16)',
      },
    },
  },
  plugins: [],
};
