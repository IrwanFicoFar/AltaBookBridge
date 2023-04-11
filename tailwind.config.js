/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        "regal-blue": "#243c5a",
        "@264653": "#264653",
        "@2A9D8F": "#2A9D8F",
        "@E9C46A": "#E9C46A",
        "@F4A261": "#F4A261",
        "@E76F51": "#E76F51",
        "@EFF1F3": "#EFF1F3",
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
