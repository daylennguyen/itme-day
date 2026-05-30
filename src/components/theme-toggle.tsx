"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const nextLight = root.classList.toggle("light");
    root.classList.toggle("dark", !nextLight);
    localStorage.setItem("itme-theme", nextLight ? "light" : "dark");
    setLight(nextLight);
  };

  return (
    <button
      type="button"
      className={cn(
        "fixed right-5 top-5 z-20 flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-border bg-secondary text-muted-foreground transition-colors hover:border-[var(--gobby-skin)] hover:text-foreground",
        className,
      )}
      onClick={toggle}
      aria-label="Toggle light / dark"
    >
      {light ? <Sun className="h-[17px] w-[17px]" /> : <Moon className="h-[17px] w-[17px]" />}
    </button>
  );
}
