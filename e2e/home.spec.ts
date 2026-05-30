import { expect, test } from "@playwright/test";

import { projects } from "../src/data/projects";

test("home page shows hub, mascot, and project links", async ({ page }) => {
  await page.goto("/");

  const firstTitle = projects[0]?.title;
  expect(firstTitle).toBeTruthy();

  await expect(
    page.getByRole("button", { name: /Gobby mascot/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Daylen Nguyen" }),
  ).toBeVisible();
  await expect(page.getByText(firstTitle!, { exact: true })).toBeVisible();
  await expect(page.getByRole("tab", { name: "RNG" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Text FX" })).toBeVisible();
});

test("can switch to Text FX tab", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Text FX" }).click();
  await expect(
    page.getByRole("heading", { name: "Goblin text renderer" }),
  ).toBeVisible();
});
