import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ChillUtilCatFace } from "./chill-util-cat-face";

describe("ChillUtilCatFace", () => {
  it("should render data-facial-expression for controlled prop", () => {
    const html = renderToStaticMarkup(
      createElement(ChillUtilCatFace, {
        facialExpression: "happy",
        interactive: false,
      }),
    );
    expect(html).toContain('data-facial-expression="happy"');
  });

  it("should render initial expression when uncontrolled", () => {
    const html = renderToStaticMarkup(
      createElement(ChillUtilCatFace, {
        interactive: false,
        initialExpression: "surprised",
      }),
    );
    expect(html).toContain('data-facial-expression="surprised"');
  });
});
