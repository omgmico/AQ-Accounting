/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./assets/js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "#0F74BC",
        secondary: "#24A9E1",
        dark: "#232629",
        gray: "#60636b",
        light: "#5b6166"
      },
      fontFamily: {
        poppins: ["Poppins", "Arial", "sans-serif"],
        merriweather: ["Merriweather", "serif"]
      },
      backdropBlur: {
        xs: "2px"
      },
      boxShadow: {
        glass: "0 10px 32px 0 rgba(36, 169, 225, 0.14), 0 2.5px 12px 0 rgba(36, 169, 225, 0.08)",
        'glass-hover': "0 18px 48px 0 rgba(15,116,188,0.18), 0 6px 20px 0 rgba(36,169,225,0.09)"
      }
    }
  },
  plugins: []
}