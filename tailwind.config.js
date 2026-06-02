/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "tertiary-fixed": "#ffdcbe",
        "surface-bright": "#f4fafc",
        "surface-tint": "#006876",
        "on-surface-variant": "#3c494c",
        "on-secondary-fixed": "#002204",
        "surface-container-low": "#eff5f6",
        "surface-dim": "#d5dbdd",
        "outline-variant": "#bbc9cc",
        "secondary-fixed": "#94f990",
        "error": "#ba1a1a",
        "surface-variant": "#dde3e5",
        "secondary-container": "#91f78e",
        "on-error": "#ffffff",
        "on-secondary": "#ffffff",
        "tertiary-container": "#f79300",
        "on-tertiary-container": "#5f3500",
        "on-surface": "#161d1e",
        "surface": "#f4fafc",
        "surface-container-highest": "#dde3e5",
        "error-container": "#ffdad6",
        "surface-container-high": "#e3e9eb",
        "primary-fixed": "#a1efff",
        "tertiary": "#8b5000",
        "secondary": "#006e1c",
        "on-primary-fixed": "#001f25",
        "surface-container": "#e9eff0",
        "inverse-on-surface": "#ecf2f3",
        "on-secondary-container": "#00731e",
        "primary-fixed-dim": "#44d8f1",
        "on-tertiary-fixed-variant": "#693c00",
        "on-primary-fixed-variant": "#004e59",
        "secondary-fixed-dim": "#78dc77",
        "on-secondary-fixed-variant": "#005313",
        "background": "#f4fafc",
        "on-tertiary-fixed": "#2c1600",
        "primary": "#006876",
        "inverse-primary": "#44d8f1",
        "tertiary-fixed-dim": "#ffb870",
        "on-primary-container": "#004650",
        "inverse-surface": "#2b3133",
        "on-primary": "#ffffff",
        "outline": "#6c797c",
        "on-tertiary": "#ffffff",
        "on-background": "#161d1e",
        "primary-container": "#00bcd4",
        "on-error-container": "#93000a",
        "surface-container-lowest": "#ffffff"
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "full": "9999px",
        "2xl": "1rem",
        "3xl": "1.5rem"
      },
      spacing: {
        "margin-mobile": "16px",
        "base": "8px",
        "container-max": "1280px",
        "gutter": "24px",
        "margin-desktop": "48px"
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "sans-serif"],
        headline: ["Plus Jakarta Sans", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        handwriting: ["Caveat", "cursive"],
        display: ["Bebas Neue", "sans-serif"]
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      }
    },
  },
  plugins: [],
}
