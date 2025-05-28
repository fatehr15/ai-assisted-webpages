/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#1e1e2f',
        'neon-blue': '#00f5ff',
        'neon-green': '#39ff14',
        'neon-red': '#ff3c38',
        primary: {
          50: '#e6f9ff',
          100: '#ccf3ff',
          200: '#99e6ff',
          300: '#66d9ff',
          400: '#33ccff',
          500: '#00c0ff',
          600: '#0099cc',
          700: '#007399',
          800: '#004c66',
          900: '#002633',
        },
        secondary: {
          50: '#e6fff1',
          100: '#ccffe3',
          200: '#99ffc7',
          300: '#66ffab',
          400: '#33ff8f',
          500: '#00ff73',
          600: '#00cc5c',
          700: '#009944',
          800: '#00662d',
          900: '#003317',
        },
        accent: {
          50: '#ffede6',
          100: '#ffdbcc',
          200: '#ffb899',
          300: '#ff9466',
          400: '#ff7133',
          500: '#ff4d00',
          600: '#cc3e00',
          700: '#992e00',
          800: '#661f00',
          900: '#330f00',
        },
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        neutral: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'trace': 'trace 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'typewriter': 'typewriter 4s steps(40) 1s infinite',
      },
      keyframes: {
        trace: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typewriter: {
          '0%, 100%': { width: '0%' },
          '50%': { width: '100%' },
        },
      },
      boxShadow: {
        'neon-blue': '0 0 5px #00f5ff, 0 0 10px #00f5ff',
        'neon-green': '0 0 5px #39ff14, 0 0 10px #39ff14',
        'neon-red': '0 0 5px #ff3c38, 0 0 10px #ff3c38',
      },
    },
  },
  plugins: [],
};