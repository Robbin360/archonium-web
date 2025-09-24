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
        'archonium-blue': '#00A8FF', // A vibrant blue
        'archonium-black': '#000000',
        'archonium-silver': '#C0C0C0',
        'archonium-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;
