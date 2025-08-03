/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/js/*.js",
    "./src/**/*.{html,js}",
    "./locales/*.json"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#0F74BC', // Primary brand color
          600: '#096dd9',
          700: '#0050b3',
          800: '#003a8c',
          900: '#002766',
        },
        secondary: {
          50: '#e6f9ff',
          100: '#b3ecff',
          200: '#80dfff',
          300: '#4dd2ff',
          400: '#24A9E1', // Secondary brand color
          500: '#1890ff',
          600: '#177ddc',
          700: '#1565c0',
          800: '#0d47a1',
          900: '#042759',
        },
        dark: {
          50: '#f7f8f9',
          100: '#edeef1',
          200: '#d1d5db',
          300: '#9ca3af',
          400: '#6b7280',
          500: '#4b5563',
          600: '#374151',
          700: '#232629', // Dark brand color
          800: '#1f2937',
          900: '#111827',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        }
      },
      fontFamily: {
        'sans': ['Poppins', 'Arial', 'sans-serif'],
        'serif': ['Merriweather', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'merriweather': ['Merriweather', 'serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'glass': '0 10px 32px 0 rgba(36, 169, 225, 0.14), 0 2.5px 12px 0 rgba(36, 169, 225, 0.08), 0 0.5px 2px 0 rgba(36,169,225,0.04)',
        'glass-hover': '0 18px 48px 0 rgba(15,116,188,0.18), 0 6px 20px 0 rgba(36,169,225,0.09)',
        'primary': '0 4px 18px 0 rgba(36,169,225,0.11)',
        'primary-hover': '0 4px 12px rgba(15, 116, 188, 0.16)',
        'hero': '0 10px 40px 0 rgba(15,116,188,0.10)',
        'nav': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '10px',
        'xl': '12px',
        '2xl': '16px',
        '3xl': '20px',
      },
      opacity: {
        '11': '0.11',
        '46': '0.46',
        '65': '0.65',
        '78': '0.78',
        '93': '0.93',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'mesh': 'mesh 20s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.45, 1.45, 0.44, 1) forwards',
        'icon-pop': 'iconPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shimmer': 'shimmer 1s ease-in-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        mesh: {
          '0%, 100%': { transform: 'scale(1) rotate(0deg)' },
          '50%': { transform: 'scale(1.05) rotate(1deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        iconPop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.18) rotate(-5deg)' },
          '80%': { transform: 'scale(0.97) rotate(3deg)' },
          '100%': { transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { left: '-75%', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { left: '110%', opacity: '0' },
        },
      },
      backgroundImage: {
        'mesh': "url('../blobs/meshbg.svg')",
        'noise': "url('../images/noise.png')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      filter: {
        'glass-blur': 'blur(10px)',
        'bg-blur': 'blur(50px)',
        'cursor-blur': 'blur(2000px)',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
