import { test, expect } from "@playwright/test";

/*
 * This is a e2e test scenario that opens the app, fills in the inputs and checks that the calculation results are shown in the correct format.
 */

test("fills inputs and shows calculation", async ({ page }) => {
  // Open the page
  await page.goto("/");

  // Fill amount
  const amountInput = page.getByLabel("Částka (CZK)");
  await amountInput.fill("");
  await amountInput.fill("200000");

  // Select a bank, different than the default one (if possible)
  const bankSelect = page.getByLabel("Banka");
  const optionCount = await bankSelect.locator("option").count();
  await bankSelect.selectOption({ index: optionCount > 1 ? 1 : 0 });

  // Ensure selected-bank panel is visible
  const panel = page
    .getByRole("heading", { name: "Výpočet pro vybranou banku" })
    .locator("..");
  await expect(panel).toBeVisible();

  // Check interest, tax and total are displayed and look like CZK values
  const interest = panel.getByText("Úroky:").locator("strong");
  const tax = panel.getByText("Daň").locator("strong");
  const total = panel.getByText("Celkem po 1 roce:").locator("strong");

  await expect(interest).toContainText("Kč");
  await expect(tax).toContainText("Kč");
  await expect(total).toContainText("Kč");

  // Ensure comparison table has rows
  await expect(page.locator("table tbody tr").first()).toBeVisible();
});
