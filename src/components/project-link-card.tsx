"use client";

import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ProjectLink } from "@/data/projects";
import { isExternalHref } from "@/lib/link";

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
    >
      <Card>
        <CardHeader className="gap-3">
          <CardTitle>{project.title}</CardTitle>
          {project.description ? (
            <CardDescription>{project.description}</CardDescription>
          ) : null}
          <Button variant="secondary" className="w-fit" asChild>
            <a
              href={project.href}
              {...(external
                ? { rel: "noopener noreferrer", target: "_blank" }
                : {})}
            >
              Visit
            </a>
          </Button>
        </CardHeader>
      </Card>
    </motion.li>
  );
}
