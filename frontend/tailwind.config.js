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
    },
  },
  plugins: [],
};
