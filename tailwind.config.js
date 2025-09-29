/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF0080',
        secondary: '#FFFFFF',
        accent: '#B026FF',
        neutral: {
          dark: '#111111',
          light: '#F8F9FA',
          gray: '#6B7280',
        },
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF0080 0%, #B026FF 100%)',
        'gradient-hover': 'linear-gradient(135deg, #FF4DB8 0%, #C158FF 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(255,0,128,0.1) 0%, rgba(176,38,255,0.1) 100%)',
      },
      boxShadow: {
        'neon-glow': '0 0 12px rgba(255,0,128,0.5)',
        'neon-glow-strong': '0 0 20px rgba(255,0,128,0.8)',
        'soft-card': '0 4px 12px rgba(0,0,0,0.08)',
        'soft-card-hover': '0 8px 24px rgba(0,0,0,0.12)',
        'glassmorphic': '0 8px 32px rgba(255,255,255,0.1)',
      },
      borderRadius: {
        'card': '1.25rem',
        'button': '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 12px rgba(255,0,128,0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(255,0,128,0.8)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
