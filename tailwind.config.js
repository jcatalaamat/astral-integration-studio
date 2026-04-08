/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ASTRAL INTEGRATION LIGHT THEME
        // Warm light backgrounds
        dark: {
          bg: '#F5F0EA',
          card: '#FDFCFA',
          cardHover: '#F0EBE4',
        },
        // Accent colors — warm terra/copper
        accent: {
          DEFAULT: '#9E6B4A',
          hover: '#7A5238',
          glow: 'rgba(158, 107, 74, 0.1)',
          glowStrong: 'rgba(158, 107, 74, 0.2)',
          subtle: 'rgba(158, 107, 74, 0.05)',
          border: 'rgba(158, 107, 74, 0.15)',
        },
        gold: {
          DEFAULT: '#9E6B4A',
          soft: 'rgba(158, 107, 74, 0.08)',
        },
        // Semantic state colors
        success: {
          DEFAULT: '#7fb885',
          bg: 'rgba(127, 184, 133, 0.08)',
        },
        error: {
          DEFAULT: '#e05c5c',
          bg: 'rgba(224, 92, 92, 0.08)',
        },
        warning: {
          DEFAULT: '#d4a24e',
          bg: 'rgba(212, 162, 78, 0.08)',
        },
        // Text colors (dark text on light bg)
        content: {
          primary: '#1F1F1F',
          secondary: '#555555',
          muted: '#888888',
        },
        // Border colors
        border: {
          DEFAULT: 'rgba(0, 0, 0, 0.08)',
          hover: 'rgba(0, 0, 0, 0.15)',
        },
        // Tool-specific theme colors (via CSS variables)
        tool: {
          primary: 'var(--tool-primary, #c4956a)',
          primaryGlow: 'var(--tool-primary-glow, rgba(196, 149, 106, 0.15))',
          accent: 'var(--tool-accent, #2A9D6A)',
        },
      },
      fontSize: {
        // Typography scale
        'display': ['clamp(3rem, 8vw, 6.5rem)', { lineHeight: '1.05', fontWeight: '300' }],
        'display-sm': ['clamp(2.2rem, 5vw, 3.5rem)', { lineHeight: '1.15', fontWeight: '300' }],
        'h1': ['2rem', { lineHeight: '1.2', fontWeight: '400' }],
        'h2': ['1.8rem', { lineHeight: '1.25', fontWeight: '400' }],
        'h3': ['1.5rem', { lineHeight: '1.4', fontWeight: '400' }],
        'h4': ['1.3rem', { lineHeight: '1.4', fontWeight: '400' }],
        'body': ['1.15rem', { lineHeight: '1.7', fontWeight: '300' }],
        'body-sm': ['0.9rem', { lineHeight: '1.65', fontWeight: '300' }],
        'meta': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.3em' }],
        'nav': ['0.82rem', { lineHeight: '1.5', letterSpacing: '0.12em', fontWeight: '500' }],
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
      },
      maxWidth: {
        'content': '1100px',
        'prose': '600px',
      },
      spacing: {
        'section': '8rem',
        'section-lg': '10rem',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'fadeUp': 'fadeUp 1s ease forwards',
        'scrollPulse': 'scrollPulse 2s ease-in-out infinite',
        'reveal': 'reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -30px) scale(1.05)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scrollPulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(1)' },
          '50%': { opacity: '1', transform: 'scaleY(1.3)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '14px',
        'xl': '16px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(158, 107, 74, 0.12)',
        'glow-lg': '0 0 60px rgba(158, 107, 74, 0.25), 0 10px 40px rgba(0,0,0,0.15)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
