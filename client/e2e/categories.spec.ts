import { expect, test } from "@playwright/test";

test("a user can add and delete a category", async ({ page }) => {
	const name = `Travel ${Date.now()}`;

	await page.goto("/");

	await page.getByRole("button", { name: "Categories" }).click();

	await page.getByPlaceholder("Category name").fill(name);
	await page.getByRole("button", { name: "Add" }).click();

	const row = page.getByRole("listitem").filter({ hasText: name });
	await expect(row).toBeVisible();

	await row.getByRole("button", { name: "Delete" }).click();
	await expect(page.getByText(name)).toBeHidden();
});
