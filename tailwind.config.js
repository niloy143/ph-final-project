/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  daisyui: {
    themes: [
      {
        doctorsPortal: {
          primary: "#3A4256",
          secondary: "#0FCFEC",
          accent: "#19D3AE",
          neutral: "#3A4256",
          "base-100": "#ffffff",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        }
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui")
  ],
}
