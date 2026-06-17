/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#04040A',
          secondary: '#080B14',
          card: '#0D111E',
          'card-hover': '#121828',
        },
        accent: {
          violet: '#6D56FA',
          'violet-light': '#9B87FF',
          cyan: '#00D4FF',
          green: '#39D98A',
          amber: '#F5A623',
        },
        text: {
          primary: '#F0F2FF',
          secondary: '#8892B0',
          muted: '#4A5370',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': '12px',
      },
      borderRadius: {
        '4xl': '32px',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -30px) scale(1.08)' },
        },
        'pulse-soft': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'bounce-down': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(8px)' },
        },
      },
      animation: {
        float: 'float 3.5s ease-in-out infinite',
        'float-slow': 'float-slow 11s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2.6s ease-in-out infinite',
        'bounce-down': 'bounce-down 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
