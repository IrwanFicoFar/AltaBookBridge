/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    screens: {
      "md-to-lg": "960px",
      // => @media (min-width: 640px) { ... }
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        "regal-blue": "#243c5a",
        "@264653": "#264653",
        "@2A9D8F": "#2A9D8F",
        "@E9C46A": "#E9C46A",
        "@F4A261": "#F4A261",
        "@E76F51": "#E76F51",
        "@EFF1F3": "#EFF1F3",
        "@1F7168": "#1F7168",
      },
    },
    borderRadius: {
      none: "0",
      sm: "0.125rem",
      DEFAULT: "0.25rem",
      DEFAULT: "4px",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px",
      large: "12px",
      yes: "2rem",
    },
  },
  plugins: [require("preline/plugin")],
};
