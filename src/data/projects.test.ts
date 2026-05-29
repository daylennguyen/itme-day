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
  it("should expose at least one valid project link", () => {
    expect(projects.length).toBeGreaterThan(0);

    for (const project of projects) {
      expect(project.id.trim().length).toBeGreaterThan(0);
      expect(project.title.trim().length).toBeGreaterThan(0);
      expect(isValidHttpUrl(project.href)).toBe(true);
    }
  });
});
