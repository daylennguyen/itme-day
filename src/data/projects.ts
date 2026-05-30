export type ProjectLink = {
  id: string;
  title: string;
  href: string;
  description: string;
  tags: string[];
};

export const projects: ProjectLink[] = [
  {
    id: "gobby",
    title: "Gobby",
    href: "https://gobby.itme.day/",
    description:
      "An AI dungeon master for solo Dungeons & Dragons play — roll, narrate, and adventure on your own.",
    tags: ["AI", "D&D", "Next.js"],
  },
  {
    id: "rng-react-components",
    title: "rng-react-components",
    href: "https://itmedotday.github.io/rng-react-components/",
    description:
      "A high-fidelity suite of RNG & gaming UI components for React — dice, coins, wheels, and a D20 roller.",
    tags: ["React", "TypeScript", "open source"],
  },
  {
    id: "itme-day",
    title: "itme.day",
    href: "https://itme.day/",
    description: "This little hub — a minimal home for the projects I'm tinkering with.",
    tags: ["web"],
  },
];
