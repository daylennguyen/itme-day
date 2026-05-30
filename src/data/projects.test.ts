import { describe, expect, it } from "vitest";

import { projects } from "./projects";

function isValidHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

describe("projects", () => {
  it("should expose valid project links with tags", () => {
    expect(projects.length).toBeGreaterThanOrEqual(3);

    for (const project of projects) {
      expect(project.id.trim().length).toBeGreaterThan(0);
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(project.description.trim().length).toBeGreaterThan(0);
      expect(isValidHttpUrl(project.href)).toBe(true);
      expect(project.tags.length).toBeGreaterThan(0);
      for (const tag of project.tags) {
        expect(tag.trim().length).toBeGreaterThan(0);
      }
    }
  });

  it("should include rng-react-components", () => {
    expect(projects.some((p) => p.id === "rng-react-components")).toBe(true);
  });
});
