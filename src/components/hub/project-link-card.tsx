"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import type { ProjectLink } from "@/data/projects";
import { isExternalHref } from "@/lib/link";
import { cn } from "@/lib/utils";

type ProjectLinkCardProps = {
  project: ProjectLink;
  index: number;
};

export function ProjectLinkCard({ project, index }: ProjectLinkCardProps) {
  const external = isExternalHref(project.href);

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 * index }}
      className="list-none"
    >
      <a
        href={project.href}
        {...(external
          ? { rel: "noopener noreferrer", target: "_blank" }
          : {})}
        className={cn(
          "group relative block rounded-[14px] border border-[rgba(132,155,73,0.22)] bg-card px-[22px] py-5 text-card-foreground no-underline",
          "shadow-[0_1px_3px_rgba(0,0,0,0.3),0_0_18px_rgba(132,155,73,0.14),inset_0_1px_0_rgba(255,255,255,0.05)]",
          "transition-[transform,box-shadow,border-color] duration-250",
          "hover:-translate-y-0.5 hover:border-[rgba(132,155,73,0.55)]",
          "hover:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_0_28px_rgba(132,155,73,0.34),0_0_56px_rgba(132,155,73,0.16),inset_0_1px_0_rgba(255,255,255,0.07)]",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <span className="text-[16.5px] font-semibold tracking-[-0.01em]">
            {project.title}
          </span>
          <ArrowUpRight
            className="h-[18px] w-[18px] shrink-0 text-muted-foreground transition-[transform,color] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gobby-skin"
            aria-hidden
          />
        </div>
        <p className="mt-2 text-sm leading-normal text-muted-foreground">
          {project.description}
        </p>
        {project.tags.length > 0 ? (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-secondary px-2.5 py-0.5 font-mono text-[10.5px] font-medium tracking-wide text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </a>
    </motion.li>
  );
}
