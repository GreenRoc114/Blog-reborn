/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}"],
  darkMode: "class", // allows toggling dark mode manually
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Serif SC", "Plus Jakarta Sans", "sans-serif", ...defaultTheme.fontFamily.sans],
        serif: ["Noto Serif SC", "Lora", "Georgia", "serif", ...defaultTheme.fontFamily.serif],
        mono: ["JetBrains Mono Variable", "JetBrains Mono", ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        'skeuo-card': '0 4px 10px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.02), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'skeuo-card-dark': '0 10px 25px rgba(0, 0, 0, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'skeuo-btn': '0 2px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.7)',
        'skeuo-btn-active': '0 1px 1px rgba(0, 0, 0, 0.06), inset 0 1px 3px rgba(0, 0, 0, 0.1)',
        'skeuo-switch': 'inset 0 2px 5px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.4)',
        'skeuo-switch-dark': 'inset 0 3px 6px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
