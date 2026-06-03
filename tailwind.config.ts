import type {Config} from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        charcoal: '#171717',
        smoke: '#252525',
        gold: '#c8a45d',
        cream: '#f5f0e8'
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        gold: '0 24px 80px rgba(200, 164, 93, 0.16)'
      }
    }
  },
  plugins: []
};

export default config;
