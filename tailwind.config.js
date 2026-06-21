/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./tools/**/*.html",
    "./tools/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color tokens
        primary: {
          DEFAULT: '#667eea',
          hover: '#5563d1',
        },
        background: {
          DEFAULT: '#ffffff',
          sidebar: '#efedf5',
          card: '#f3eff8',
          hover: '#f3f0f9',
        },
        surface: {
          DEFAULT: '#EADDFF',
        },
        border: {
          DEFAULT: '#e4e4e7',
        },
        text: {
          primary: '#49454F',
          secondary: '#666',
        },
        accent: {
          light: '#EADDFF',
          fill: '#743bc9',
        },
        nav: {
          active: 'rgb(129 86 147)',
        },
        // Button colors
        button: {
          primary: '#667eea',
          'primary-hover': '#5563d1',
          secondary: '#e4e4e7',
          'secondary-hover': '#d1d5db',
          success: '#10b981',
          'success-hover': '#059669',
          danger: '#ff4d4d',
          'danger-hover': '#cc0000',
          info: '#2196F3',
          'info-hover': '#0b7dda',
          dark: '#1f2937',
          'dark-hover': '#374151',
        },
      },
      spacing: {
        // Semantic spacing tokens
        'sidebar-width': '360px',
        'card-gap': '24px',
        'nav-gap': '10px',
      },
      borderRadius: {
        // Semantic border radius tokens
        sm: '6px',
        md: '12px',
        lg: '10px',
        nav: '8px',
      },
      boxShadow: {
        // Semantic shadow tokens
        'focus': '0 0 0 4px rgba(0, 0, 0, 0.04)',
      },
      fontSize: {
        // Semantic font size tokens
        'sidebar': '18px',
        'nav': '14px',
        'card-title': '15px',
        'card-subtitle': '13px',
        'input': '15px',
      },
      transitionDuration: {
        // Semantic transition tokens
        'default': '0.2s',
        'fast': '0.15s',
        'slow': '0.25s',
      },
    },
  },
  plugins: [],
}
