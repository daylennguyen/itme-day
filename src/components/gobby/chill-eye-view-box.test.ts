import { describe, expect, it } from "vitest";

import { computeChillEyeViewBox } from "./chill-eye-view-box";

const centerMouse = {
  elementX: 100,
  elementY: 50,
  elementWidth: 200,
  elementHeight: 100,
};

describe("computeChillEyeViewBox", () => {
  it("should return default viewBox when expression is excited", () => {
    expect(
      computeChillEyeViewBox("excited", 40, centerMouse, "viewport"),
    ).toBe("0 0 1500 1000");
  });

  it("should return default viewBox when expression is happy and scope is local", () => {
    expect(
      computeChillEyeViewBox("happy", 40, centerMouse, "local"),
    ).toBe("0 0 1500 1000");
  });

  it("should pan viewBox when expression is happy and scope is viewport", () => {
    const vb = computeChillEyeViewBox(
      "happy",
      20,
      {
        elementX: 0,
        elementY: 0,
        elementWidth: 200,
        elementHeight: 100,
      },
      "viewport",
    );
    expect(vb).not.toBe("0 0 1500 1000");
    expect(vb.endsWith("1500 1000")).toBe(true);
  });

  it("should pan viewBox toward top-left when pointer is top-left of eye SVG", () => {
    const vb = computeChillEyeViewBox(
      "neutral",
      40,
      {
        elementX: 0,
        elementY: 0,
        elementWidth: 200,
        elementHeight: 100,
      },
      "local",
    );
    const [x, y] = vb.split(" ").map(Number);
    expect(x).toBeGreaterThan(0);
    expect(y).toBeGreaterThan(0);
  });

  it("should avoid NaN viewBox values when eye element dimensions are zero", () => {
    const vb = computeChillEyeViewBox(
      "neutral",
      20,
      {
        elementX: 0,
        elementY: 0,
        elementWidth: 0,
        elementHeight: 0,
      },
      "viewport",
    );
    const [x, y] = vb.split(" ").map(Number);
    expect(Number.isFinite(x)).toBe(true);
    expect(Number.isFinite(y)).toBe(true);
  });
});
