/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        heading: ["Sora", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#185FA5",
          dark: "#0C447C",
          light: "#E6F1FB",
          deep: "#042C53",
        },
        accent: {
          DEFAULT: "#1D9E75",
          dark: "#0F6E56",
          light: "#9FE1CB",
        },
        bg: {
          DEFAULT: "#F4F7FB",
          card: "#FFFFFF",
          soft: "#EEF3FA",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(0,0,0,0.06)",
        md: "0 6px 24px rgba(24,95,165,0.10)",
        lg: "0 16px 48px rgba(24,95,165,0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
