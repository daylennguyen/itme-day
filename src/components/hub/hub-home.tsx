"use client";

import { projects } from "@/data/projects";

import { HubHero } from "./hub-hero";
import { ProjectLinkCard } from "./project-link-card";

export function HubHome() {
  return (
    <div className="flex flex-col gap-10">
      <HubHero />
      <section>
        <div className="mb-[18px] text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Things I&apos;m building
        </div>
        <ul className="flex flex-col gap-3.5" aria-label="Projects">
          {projects.map((project, index) => (
            <ProjectLinkCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </ul>
      </section>
    </div>
  );
}
