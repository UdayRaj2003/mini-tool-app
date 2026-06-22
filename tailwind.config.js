/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./tools/**/*.html",
    "./tools/**/*.js",
  ],
  theme: {
    extend: {
      // Responsive breakpoints
      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },

      // Theme colors (semantic, reusable)
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: '#667eea',
          hover: '#5563d1',
        },

        // Background colors
        background: {
          DEFAULT: '#ffffff',
          sidebar: '#efedf5',
          card: '#f3eff8',
          hover: '#f3f0f9',
        },

        // Surface colors
        surface: {
          DEFAULT: '#EADDFF',
        },

        // Border colors
        border: {
          DEFAULT: '#e4e4e7',
        },

        // Text colors
        text: {
          primary: '#49454F',
          secondary: '#666',
        },

        // Accent colors
        accent: {
          light: '#EADDFF',
          fill: '#743bc9',
        },

        // Navigation colors
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

      // Spacing tokens
      spacing: {
        // Semantic spacing scale
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',

        // Layout-specific spacing (backward compatibility)
        'sidebar-width': '360px',
        'card-gap': '24px',
        'nav-gap': '10px',
      },

      // Border radius tokens
      borderRadius: {
        // Semantic radius scale
        'xs': '4px',
        'sm': '6px',
        'md': '12px',
        'lg': '10px',
        'xl': '16px',

        // Context-specific radius (backward compatibility)
        'nav': '8px',
      },

      // Box shadow tokens
      boxShadow: {
        'focus': '0 0 0 4px rgba(0, 0, 0, 0.04)',
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },

      // Font size tokens
      fontSize: {
        // Semantic font scale
        'xs': '12px',
        'sm': '13px',
        'base': '15px',
        'md': '16px',
        'lg': '18px',
        'xl': '20px',

        // Context-specific sizes (backward compatibility)
        'sidebar': '18px',
        'nav': '14px',
        'card-title': '15px',
        'card-subtitle': '13px',
        'input': '15px',
      },

      // Transition duration tokens
      transitionDuration: {
        'fast': '0.15s',
        'default': '0.2s',
        'slow': '0.25s',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
