"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type SlidingTabTriggerProps = {
  value: string;
  activeTab: string;
  children: ReactNode;
  className?: string;
  layoutId?: string;
};

export function SlidingTabTrigger({
  value,
  activeTab,
  children,
  className,
  layoutId = "app-tab-indicator",
}: SlidingTabTriggerProps) {
  const isActive = value === activeTab;

  return (
    <TabsTrigger
      value={value}
      className={cn(
        "relative bg-transparent shadow-none data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
        className,
      )}
    >
      {isActive ? (
        <motion.span
          layoutId={layoutId}
          className="absolute inset-0 rounded-md bg-background shadow"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
          aria-hidden
        />
      ) : null}
      <span className="relative z-10">{children}</span>
    </TabsTrigger>
  );
}
