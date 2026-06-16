import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette inspired by uploaded images
        wood: {
          light: "#c8a984",
          DEFAULT: "#a07d56",
          dark: "#6b4f35",
        },
        brand: "#574235",
        cream: "#f5f1ea",
        beige: "#e8e0d4",
        sand: "#d8cdbc",
        charcoal: "#2b2b2b",
        ink: "#1c1c1c",
        // Navbar background = logo background (matches logo exactly)
        navbar: "#fbfbfb",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      maxWidth: {
        site: "1280px",
      },
    },
  },
  plugins: [],
};

export default config;
