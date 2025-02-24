/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        backgroundLight: 'var(--background-light)',
        backgroundDark: 'var(--background-dark)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        altPrimary: 'var(--alt-primary)',
        altAccent: 'var(--alt-accent)',
        textLight: 'var(--text-light)',
        textDark: 'var(--text-dark)',
        error: 'var(--error)',
        confirm: 'var(--confirm)',
        link: 'var(--link)',
        darkBg: 'var(--dark-bg)',
        darkCard: 'var(--dark-card)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        subheading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '25%': { transform: 'translate(-5px, 5px)' },
          '50%': { transform: 'translate(-5px, -5px)' },
          '75%': { transform: 'translate(5px, 5px)' },
          '100%': { transform: 'translate(5px, -5px)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        tilt: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        rotate3d: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(10deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        glitch:
          'glitch 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite',
        pulse: 'pulse 2s ease-in-out infinite',
        tilt: 'tilt 10s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        rotate3d: 'rotate3d 10s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial':
          'radial-gradient(var(--tw-gradient-stops))',
        'gradient-linear':
          'linear-gradient(var(--tw-gradient-stops))',
        'primary-gradient': 'var(--primary-gradient)',
        shimmer:
          'linear-gradient(to right, transparent 0%, rgba(231, 144, 35, 0.2) 50%, transparent 100%)',
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgba(231, 144, 35, 0.5)',
        glow: '0 0 15px rgba(231, 144, 35, 0.5)',
        'glow-lg': '0 0 25px rgba(231, 144, 35, 0.5)',
        '3d': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        '3d-hover': '0 20px 40px -10px rgba(231, 144, 35, 0.3)',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
      scale: {
        102: '1.02',
        103: '1.03',
      },
    },
  },
  plugins: [],
  safelist: [
    'border-opacity-10',
    'border-opacity-20',
    'border-opacity-30',
    'border-opacity-40',
    'border-opacity-50',
    'bg-opacity-10',
    'bg-opacity-20',
    'bg-opacity-30',
    'bg-opacity-40',
    'bg-opacity-50',
    'shadow-primary',
    'shadow-opacity-10',
    'shadow-opacity-20',
    'shadow-opacity-30',
    'ring-opacity-50',
  ],
};

export default tailwindConfig;
