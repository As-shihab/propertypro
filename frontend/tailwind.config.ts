import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // 👈 enables dark mode via a class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: {} },
  plugins: [],
};

export default config;
