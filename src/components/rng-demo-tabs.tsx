"use client";

import {
  CoinFlip,
  D20Roll,
  DiceSlider,
  RngWheel,
} from "@itme.day/rng-react-components";
import { useState } from "react";

import { SlidingTabTrigger } from "@/components/sliding-tab-trigger";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";

const rngTabs = [
  {
    value: "dice-roll",
    label: "Dice Roll",
    content: <DiceSlider initialTarget={50} initialIsRollOver />,
  },
  {
    value: "rng-wheel",
    label: "RNG Wheel",
    content: <RngWheel />,
  },
  {
    value: "d20",
    label: "D20",
    content: <D20Roll initialTarget={11} />,
  },
  {
    value: "coin-flip",
    label: "Coin Flip",
    content: <CoinFlip initialPrediction="orange" />,
  },
] as const;

export function RngDemoTabs() {
  const [rngTab, setRngTab] = useState<string>(rngTabs[0].value);

  return (
    <Tabs
      value={rngTab}
      onValueChange={setRngTab}
      className="flex w-full flex-col gap-6"
    >
      <TabsList className="grid h-auto w-full grid-cols-2 gap-1 p-1 sm:grid-cols-4">
        {rngTabs.map((tab) => (
          <SlidingTabTrigger
            key={tab.value}
            value={tab.value}
            activeTab={rngTab}
            layoutId="rng-tab-indicator"
            className="px-2 py-1.5 text-xs sm:text-sm"
          >
            {tab.label}
          </SlidingTabTrigger>
        ))}
      </TabsList>

      {rngTabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="mt-0 flex justify-center"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
