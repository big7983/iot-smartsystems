import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#293c64",
        secondary: "#4e73c3",
        orange:"#e37b30",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
      },
    },
  },
  plugins: [],
} satisfies Config;
