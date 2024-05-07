import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        bangers: ["var(--font-bangers)"],
      },
      fontSize: {
        fluid: "clamp(1.5rem, 6vw, 5rem)",
      },
      lineHeight: {
        fluid: "clamp(1.5rem, 7vw, 5rem)",
      },
      colors: {
        bg: "#FDFDFD",
      },
    },
  },
  plugins: [],
};
export default config;
