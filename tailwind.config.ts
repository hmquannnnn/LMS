import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      headingText: ['"Roboto Slab"', "sans-serif"],
      headingOpenSans: ['"OpenSans"', "sans-serif"],
      vollkorn: ['"Vollkorn"', "serif"],
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue_1: "#b9e6f6",
        blue_2: "#d9edfb",
        blue_3: "#56aed1",
        blue_4: "#246c8b",
        blue_5: "#072251",
        blue_6: "#dcf3fb",
        blue_7: "#126b8c",
        pink_1: "#fec5b9",
        pink_2: "#f49ba2",
        yellow_1: "#ffe5b5",
        green_1: "#c6e5a4",
        green_2: "#0fb251",
        green_3: "#517b23",
      },
    },
  },
  plugins: [],
  safelist: [
    "min-w-[600px]",
    "max-w-[600px]",
    "min-w-[300px]",
    "max-w-[300px]",
    "min-h-[200px]",
    "min-h-[400px]",
  ],
};
export default config;
