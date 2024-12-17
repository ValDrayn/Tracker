/** @type {import('tailwindcss').Config} */
import tailwindScrollbarHide from "tailwind-scrollbar-hide";
import tailwindTextStroke from "tailwindcss-text-stroke";

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
      keyframes: {
        rotateInfinite: {
          "0%": { transform: "rotate(90deg)" },
          "25%": { transform: "rotate(90deg)" },
          "50%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        popUpInfinite: {
          "0%": { opacity: 1 },
          "25%": { opacity: 0.5 },
          "50%": { opacity: 0 },
          "75%": { opacity: 0.5 },
          "100%": { opacity: 1 },
        },
        slideLeftToRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        rotateInfinite: "rotateInfinite 1.5s ease-out infinite",
        popUpInfinite: "popUpInfinite 1.5s ease-in-out infinite",
        slideLeftToRight: "slideLeftToRight 1s ease-out forwards",
      },
      height: {
        dvh: "100dvh",
      },
    },
  },
  plugins: [tailwindScrollbarHide, tailwindTextStroke],
};
