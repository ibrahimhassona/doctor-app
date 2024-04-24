import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        light_red: "#ff6369",
        red: "#e74c3c",
        yellow: "#fdb415",
        light_blck: "#404040",
        blck: "#2e2e2e",
        white: "#ffffff",
        light_white: "#ededed",
        gray: "#e1e1e1",
        light_yellow: " #f5b72f",
        green: "#2c9765",
        light_green: "#1aba6f",
      },
      fontFamily:{
        ar:["var(--font-kufi)",'tahoma'],
        en:['var(--font-inter)' , 'sans-serif']
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],//  darkMode: "class",
};
export default config;
