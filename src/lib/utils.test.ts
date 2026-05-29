import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("should merge tailwind classes when later wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
