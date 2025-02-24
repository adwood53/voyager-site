/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        accent: 'var(--accent)',
        textLight: 'var(--text-light)',
        darkPrimary: 'var(--dark-primary)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        subheading: ['var(--font-subheading)', 'sans-serif'],
        accent: ['var(--font-accent)', 'cursive'],
        body: ['var(--font-body)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
