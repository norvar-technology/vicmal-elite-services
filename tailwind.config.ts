import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./context/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: "#05070c",
        ink: "#0a0e17",
        panel: "#0f1420",
        panel2: "#141a2a",
        line: "#232b3d",
        circuit: {
          50: "#eaf6ff",
          200: "#9fe0ff",
          400: "#4fc3ff",
          500: "#2fa9ff",
          600: "#2f6bff",
          700: "#1f4fd6",
        },
        volt: {
          400: "#8f7bff",
          500: "#7c5cff",
          600: "#6338ff",
        },
        signal: {
          400: "#ffcb57",
          500: "#ffb020",
        },
        mist: "#8a93a6",
        chalk: "#edeff5",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(47,107,255,0.08) 0%, rgba(5,7,12,0) 60%)",
        "power-gradient":
          "linear-gradient(90deg, #2fa9ff 0%, #7c5cff 100%)",
        "power-gradient-v":
          "linear-gradient(180deg, #2fa9ff 0%, #7c5cff 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(47,169,255,0.25)",
        "glow-violet": "0 0 40px rgba(124,92,255,0.25)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)",
      },
      keyframes: {
        "pulse-line": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "pulse-line": "pulse-line 2.6s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
