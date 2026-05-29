export type ProjectLink = {
  id: string;
  title: string;
  href: string;
  description?: string;
};

export const projects: ProjectLink[] = [
  {
    id: "gobby",
    title: "Gobby",
    href: "https://gobby.itme.day/",
    description: "AI dungeon master for solo D&D play.",
  },
  {
    id: "itme-day",
    title: "itme.day",
    href: "https://itme.day/",
    description: "This link hub.",
  },
];
