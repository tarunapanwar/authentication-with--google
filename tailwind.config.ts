import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        customLightestGreen: '#a6ad9f'
      },
      spacing: {
        '7.5': '1.688rem', // 30px
        '4.25': '1.125rem', // 17px
      },
      colors: {
        lightestGreen: '#686c4ce0'
      }
    },
  },
  plugins: [],
};
export default config;
