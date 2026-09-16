/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        asphalt: {
          DEFAULT: "#14181C",
          light: "#1E242B",
          border: "#2B333C",
        },
        cream: "#F3F1EC",
        amber: {
          DEFAULT: "#E8A33D",
          dark: "#C6822A",
        },
        teal: {
          DEFAULT: "#2F6F6A",
        },
      },
      fontFamily: {
        display: ["'Archivo Black'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.6s ease-out",
      },
    },
  },
  plugins: [],
};
