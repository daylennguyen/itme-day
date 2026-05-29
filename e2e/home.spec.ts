import { expect, test } from "@playwright/test";

import { projects } from "../src/data/projects";

test("home page lists project titles", async ({ page }) => {
  await page.goto("/");

  const firstTitle = projects[0]?.title;
  expect(firstTitle).toBeTruthy();
  await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
  await expect(page.getByText(firstTitle!, { exact: true })).toBeVisible();
});
