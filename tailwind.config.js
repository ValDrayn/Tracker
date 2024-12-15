/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Tulpen One", "sans-serif"],
        body: ["Poppins", "sans-serif"],
      },
      colors: {
        "dark-green": "#80A217",
        "dark-blue": "#080C6E",
        "light-purple": "#E6EAFF",
        "main-blue": "#4244FD",
        "lighter-main-blue": "#6877FF",
        "lighter-purple": "#AEBBFF",
        "gray-blue": "#D2E4FF",
        "initial-radial": "#E8ECFF",
        "last-radial": "#CCD1FF",
        "dark-grey": "#8789AC",
        "darker-blue": "#222477",
      },
    },
  },
  plugins: [tailwindScrollbarHide],
};
