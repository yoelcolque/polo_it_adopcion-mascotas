/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#096A7F',
        primaryDark: '#209DB7',
        accent: '#E8672D',
        error: '#02191E',
        background: '#ECF4F5',
        surface: '#fffbf2',
        text: '#02191E',
        muted: '#64748b'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'ui-sans-serif', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      fontSize: {
        xs: ['0.75rem', {lineHeight: '1rem'}],
        sm: ['0.875rem', {lineHeight: '1.25rem'}],
        base: ['1rem', {lineHeight: '1.5rem'}],
        lg: ['1.125rem', {lineHeight: '1.75rem'}],
        xl: ['1.25rem', {lineHeight: '1.75rem'}],
        '2xl': ['1.5rem', {lineHeight: '2rem'}],
        '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
        '4xl': ['2.25rem', {lineHeight: '2.5rem'}],
        '5xl': ['3rem', {lineHeight: '1'}],
        title: ['2rem', {lineHeight: '2.25rem', letterSpacing: '-0.02em'}],
        display: ['3.75rem', {lineHeight: '1', letterSpacing: '-0.03em'}]
      },
      animation: {
        bounce: 'bounce 0.6s infinite',
      },
      screens: {
        xs: '450px', //medida para movil (lo saque del ux/ui del diseño figma)
        sm: '0px', // default
        md: '760px', // personalizado para cambiar el layout aquí
        'md-e': '780px',
        'lg-e': '1170px',
      },
    }
  }
}
