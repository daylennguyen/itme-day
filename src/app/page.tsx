"use client";

import { useState } from "react";

import { GobbyMascotHub } from "@/components/hub/gobby-mascot-hub";
import { HubHome } from "@/components/hub/hub-home";
import { RngDemoTabs } from "@/components/rng-demo-tabs";
import { SiteFooter } from "@/components/site-footer";
import { SlidingTabTrigger } from "@/components/sliding-tab-trigger";
import { TextFxPanel } from "@/components/text-fx/text-fx-panel";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

export default function HomePage() {
  const [tab, setTab] = useState("home");

  return (
    <main className="mx-auto flex min-h-screen max-w-[600px] flex-col gap-14 px-6 pb-16 pt-[72px] sm:gap-14">
      <GobbyMascotHub />

      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex w-full flex-col gap-8"
      >
        <TabsList className="grid w-full grid-cols-3">
          <SlidingTabTrigger value="home" activeTab={tab}>
            Home
          </SlidingTabTrigger>
          <SlidingTabTrigger value="rng" activeTab={tab}>
            RNG
          </SlidingTabTrigger>
          <SlidingTabTrigger value="fx" activeTab={tab}>
            Text FX
          </SlidingTabTrigger>
        </TabsList>

        <TabsContent value="home" className="mt-0">
          <HubHome />
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

        <TabsContent value="fx" className="mt-0">
          <TextFxPanel />
        </TabsContent>
      </Tabs>

      <SiteFooter />
    </main>
  );
}
