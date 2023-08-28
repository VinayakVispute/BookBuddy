/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#3E8DE3",
      secondary: "#143AA2",
      whiteSecondary: "#D3D4D7",
      blackSeconday: "#04060D",
      stale: "rgb(71 85 105);",
    },
    backgroundImage: {
      "hero-pattern": "url('./src/assets/images/HeroRightSection.png')",
    },
  },
};
