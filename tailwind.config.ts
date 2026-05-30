import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        fantasy: ["var(--font-fantasy)"],
        titling: ["var(--font-titling)"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        gobby: {
          skin: "var(--gobby-skin)",
          "skin-deep": "var(--gobby-skin-deep)",
          cream: "var(--gobby-cream)",
          ring: "var(--gobby-ring)",
        },
        rng: {
          bg: "var(--rng-bg)",
          surface: "var(--rng-surface)",
          "surface-2": "var(--rng-surface-2)",
          muted: "var(--rng-muted)",
          indigo: "var(--rng-indigo)",
          violet: "var(--rng-violet)",
          emerald: "var(--rng-emerald)",
          rose: "var(--rng-rose)",
        },
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
