module.exports = {
  content: ['./**/*.html', './src/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          light: '#818cf8',
        },
        secondary: {
          DEFAULT: '#0ea5e9',
          dark: '#0284c7',
        },
        dark: '#1e1b4b',
        muted: '#64748b',
      },
      spacing: {
        'section': '5rem',
        'section-sm': '3rem',
        'card': '1.5rem',
      },
      borderRadius: {
        'card': '0.75rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
