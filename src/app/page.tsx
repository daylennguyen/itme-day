"use client";

import { motion } from "motion/react";
import { useState } from "react";

import { GobbyMascot } from "@/components/gobby/gobby-mascot";
import { ProjectLinkCard } from "@/components/project-link-card";
import { RngDemoTabs } from "@/components/rng-demo-tabs";
import { SlidingTabTrigger } from "@/components/sliding-tab-trigger";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { projects } from "@/data/projects";

export default function HomePage() {
  const [tab, setTab] = useState("home");

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 px-6 py-16">
      <GobbyMascot className="mx-auto" />

      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex w-full flex-col gap-8"
      >
        <TabsList className="grid w-full grid-cols-2">
          <SlidingTabTrigger value="home" activeTab={tab}>
            Home
          </SlidingTabTrigger>
          <SlidingTabTrigger value="rng" activeTab={tab}>
            RNG
          </SlidingTabTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-0 flex flex-col gap-10">
          <motion.header
            className="flex flex-col gap-2"
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
        </TabsContent>

        <TabsContent value="rng" className="mt-0 flex flex-col gap-6">
          <header className="flex flex-col gap-2">
            <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              RNG
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">
              Random generators
            </h1>
            <p className="text-muted-foreground">
              Dice, tables, and other tools from rng-react-components.
            </p>
          </header>

          <div className="rng-console-host -mx-6 rounded-2xl px-6 py-8">
            <RngDemoTabs />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
