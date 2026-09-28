import { expect, test } from "@playwright/test";

test("a user can add, edit, and delete an expense", async ({ page }) => {
	
	const description = `Coffee ${Date.now()}`;

	await page.goto("/");

	
	await page.getByPlaceholder("Description").fill(description);
	await page.getByPlaceholder("Amount (€)").fill("3.50");
	await page.getByPlaceholder("dd.mm.yyyy").fill("10.08.2026");
	await page.getByRole("button", { name: "Add" }).click();

	const row = page.getByRole("listitem").filter({ hasText: description });
	await expect(row).toBeVisible();
	await expect(row).toContainText("3.50 €");

	
	await row.getByRole("button", { name: "Edit" }).click();

	
	const editingRow = page
		.getByRole("listitem")
		.filter({ has: page.getByRole("button", { name: "Save" }) });

	await editingRow.getByRole("spinbutton").fill("4.00");
	await editingRow.getByRole("button", { name: "Save" }).click();

	const updatedRow = page.getByRole("listitem").filter({ hasText: description });
	await expect(updatedRow).toContainText("4.00 €");


	await updatedRow.getByRole("button", { name: "Delete" }).click();
	await expect(page.getByText(description)).toBeHidden();
});