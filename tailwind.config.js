/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F2F0E9',   // warm bone paper
          secondary: '#EAE7DD',  // slightly deeper band
          card: '#FBFAF6',       // near-white surface
          'card-hover': '#FFFFFF',
        },
        accent: {
          // brand throughline — artistic green family
          lime: '#CBF24A',       // electric highlight (ink text sits on it)
          green: '#0FA56C',      // emerald foreground (links, icons)
          // muted earthy category tints
          violet: '#4A40C9',     // indigo
          'violet-light': '#6A60E0',
          cyan: '#1C7E92',       // teal
          amber: '#B26B2A',      // ochre / clay
        },
        ink: {
          DEFAULT: '#15140F',
          soft: '#5C594E',
          muted: '#94907F',
        },
        text: {
          primary: '#15140F',
          secondary: '#5C594E',
          muted: '#94907F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Unbounded', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        '2xs': '12px',
      },
      borderRadius: {
        card: '8px',
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
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
