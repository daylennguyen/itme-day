"use client";

import { motion } from "motion/react";

// import { GobbyMascot } from "@/components/gobby/gobby-mascot";
import { ProjectLinkCard } from "@/components/project-link-card";
import { projects } from "@/data/projects";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col gap-10 px-6 py-16">


      <motion.header
        className="space-y-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          itme.day
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="text-muted-foreground">
          A minimal list of things I am building.
        </p>
      </motion.header>

      <ul className="flex flex-col gap-4" aria-label="Projects">
        {projects.map((project, index) => (
          <ProjectLinkCard
            key={project.id}
            project={project}
            index={index}
          />
        ))}
      </ul>
    </main>
  );
}
