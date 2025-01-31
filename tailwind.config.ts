import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'pulse-text': 'pulseText 1.5s ease-in-out infinite',
      },
      keyframes: {
        pulseText: {
          '0%, 100%': {
            transform: 'scale(1)',
            color: '#38a169', // verde
          },
          '50%': {
            transform: 'scale(1.1)',
            color: '#f87171', // vermelho
          },
        },
      },
    },
  },
  plugins: [],
  
};
export default config;
