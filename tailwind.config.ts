import type { Config } from "tailwindcss";

const config: Config = {
  important: true,
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
      timesNewRoman: ['"Times New Roman"', "serif"],
      josefin: ['"Josefin Sans"', "sans-serif"],
      iciel: ['"IcielLa Chic Pro Shad"', "sans-serif"],
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
        blue_8: "#4fc1e9",
        blue_9: "#b6cff9",
        blue_10: "#0b4582",
        blue_11: "#5e86b4",
        blue_12: "#d6e4fc",
        pink_1: "#fec5b9",
        pink_2: "#f49ba2",
        pink_3: "#f8bbc1",
        pink_4: "#920f1d",
        pink_5: "#aa280e",
        yellow_1: "#ffe5b5",
        yellow_2: "#a26900",
        green_1: "#c6e5a4",
        green_2: "#0fb251",
        green_3: "#517b23",
        green_4: "#b6c8a3",
        green_5: "#d9eec3",
        green_6: "#ecf4d0",
        grey_1: "#d9d9d9",
        grey_2: "#404040",
        purple_1: "#367ff0",
        purple_2: "#b3cbfb",
        purple_3: "#6d9ef3",
        purple_4: "#dbe7fc",
        purple_5: "#072251",
        purple_6: "#e9f1fd",
        purple_7: "#97b0ec",
      },

      screens: {
        tablet: "640px",
        // => @media (min-width: 640px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        laptop125percent: "1400px",
        largelaptop: "1600px",

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
      fontFamily: {
        "font-Arial": ["Arial"],
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
    "bg-white/0",
    "bg-white/5",
    "bg-white/10",
    "bg-white/15",
    "bg-white/20",
    "bg-white/25",
    "bg-white/30",
    "bg-white/35",
    "bg-white/40",
    "bg-white/45",
    "bg-white/50",
    "bg-white/55",
    "bg-white/60",
    "bg-white/65",
    "bg-white/70",
    "bg-white/75",
    "bg-white/80",
    "bg-white/85",
    "bg-white/90",
    "bg-white/95",
    "bg-white/100",
  ],
};
export default config;
