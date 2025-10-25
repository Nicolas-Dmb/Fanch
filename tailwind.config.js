module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        perso: ['"Nika"', "sans-serif"],
      },
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
        '20%': { transform: 'translateX(-0.5px) rotate(-0.5deg)' },
        '40%': { transform: 'translateX(0.5px) rotate(0.5deg)' },
        '60%': { transform: 'translateX(-0.5px) rotate(-0.5deg)' },
        '80%': { transform: 'translateX(0.5px) rotate(0.5deg)' },
      },
    },
    animation: {
      wiggle: 'wiggle 0.15s ease-in-out infinite',
    },
  },
  plugins: [],
};
