import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        stripe: {
          primary: '#533afd',
          deep: '#4434d4',
          press: '#2e2b8c',
          soft: '#eef2ff',
          ink: '#0d253d',
          secondary: '#273951',
          muted: '#64748d',
          canvas: '#ffffff',
          surface: '#f6f9fc',
          hairline: '#e3e8ee',
          input: '#a8c3de',
          ruby: '#ea2261',
        },
      },
      fontFamily: {
        sans: ['var(--font-be-vietnam-pro)', 'Be Vietnam Pro', 'system-ui', 'sans-serif'],
        display: ['var(--font-be-vietnam-pro)', 'Be Vietnam Pro', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        stripe: '0 1px 2px rgba(13, 37, 61, 0.04), 0 8px 24px -12px rgba(13, 37, 61, 0.08)',
        'stripe-lg': '0 4px 12px rgba(13, 37, 61, 0.06), 0 20px 44px -16px rgba(13, 37, 61, 0.14)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
