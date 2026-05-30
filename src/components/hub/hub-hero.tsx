"use client";

import { motion } from "motion/react";

export function HubHero() {
  return (
    <motion.header
      className="flex flex-col items-center gap-3.5 text-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        <span
          className="h-1.5 w-1.5 rounded-full bg-gobby-skin shadow-[0_0_8px_rgba(132,155,73,0.7)]"
          aria-hidden
        />
        itme.day
      </span>
      <h1 className="m-0 text-[34px] font-semibold tracking-[-0.03em] sm:text-[34px]">
        Daylen Nguyen
      </h1>
      <p className="m-0 max-w-[430px] text-base leading-relaxed text-muted-foreground text-pretty">
        Software development engineer building small, useful things. I like clean
        code, dice, and{" "}
        <span className="font-medium text-gobby-skin">goblins</span>. This is
        where the things I make live.
      </p>
    </motion.header>
  );
}
