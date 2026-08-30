import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          bg: "#0B0B0D",
          surface: "#15171C",
          gold: "#D4AF37",
          "gold-light": "#E8C766",
          blue: "#3FA9F5",
          text: "#FFFFFF",
          muted: "#B8B8B8",
        },
      },
      fontFamily: {
        display: ["var(--font-clash)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderColor: {
        DEFAULT: "rgba(255,255,255,0.08)",
      },
      backgroundImage: {
        "noir-radial":
          "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.08), transparent 60%)",
        "grid-lines":
          "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(212,175,55,0.45)",
        blue: "0 0 40px -10px rgba(63,169,245,0.45)",
        luxe: "0 20px 60px -15px rgba(0,0,0,0.6)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-20px) translateX(10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-30px) rotate(3deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-slow": "float-slow 14s ease-in-out infinite",
        "spin-slow": "spin-slow 40s linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
      letterSpacing: {
        tightest: "-0.04em",
        widest2: "0.3em",
      },
    },
  },
  plugins: [],
};

export default config;
