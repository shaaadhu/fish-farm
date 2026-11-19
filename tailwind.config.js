/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-surface': 'var(--bg-surface)',
        'bg-surface-hover': 'var(--bg-surface-hover)',
        'bg-surface-alt': 'var(--bg-surface-alt)',
        'bg-nav-footer': 'var(--bg-nav-footer)',
        'border-theme': 'var(--border-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'accent-primary': 'var(--accent-primary)',
        'accent-primary-hover': 'var(--accent-primary-hover)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-micro': 'var(--accent-micro)',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Marcellus', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
