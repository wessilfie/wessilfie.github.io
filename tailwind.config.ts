import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        flama: ["Flama", "Arial", "Helvetica", "sans-serif"],
        vegur: ["Vegur", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        brand: {
          orange: "#FF6900",
          black: "#000000",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};

export default config;
