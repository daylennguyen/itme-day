"use client";

import { useCallback, useRef, useState } from "react";

import { GobbyMascot } from "@/components/gobby/gobby-mascot";
import { cn } from "@/lib/utils";

const MOODS = ["hi.", "rolling…", "nat 20!", "goblin mode", "✦"];
const GOBBY_POP_MS = 500;

export function GobbyMascotHub() {
  const [pop, setPop] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const popTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const moodTimerRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const onTap = useCallback(() => {
    if (popTimerRef.current) window.clearTimeout(popTimerRef.current);
    if (moodTimerRef.current) window.clearTimeout(moodTimerRef.current);

    setPop(false);
    requestAnimationFrame(() => {
      setPop(true);
      setMood(MOODS[Math.floor(Math.random() * MOODS.length)] ?? "hi.");
      moodTimerRef.current = window.setTimeout(() => setMood(null), 1100);
      popTimerRef.current = window.setTimeout(() => setPop(false), GOBBY_POP_MS);
    });
  }, []);

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "h-[168px] w-[168px]",
          pop
            ? "[animation:gobbyPop_0.5s_cubic-bezier(0.3,1.6,0.5,1)]"
            : "[animation:gobbyBob_4s_ease-in-out_infinite]",
        )}
      >
        <GobbyMascot
          onTap={onTap}
          className="h-full w-full"
          frameClassName="h-full w-full max-w-none"
        />
      </div>
      <div
        className={cn(
          "h-4 text-xs font-semibold text-gobby-skin transition-all duration-200",
          mood ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
        )}
        aria-live="polite"
      >
        {mood ?? ""}
      </div>
    </div>
  );
}
