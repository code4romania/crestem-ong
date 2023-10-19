import { test, expect } from "@playwright/test";
import { login, waitForLoginError, waitForLoginSuccess } from "../utils/login";
import { fillEvaluation } from "../utils/evaluation";

test("creates evaluation and completes it", async ({ page }) => {
  await login(page, {
    email: process.env.TEST_USER_EMAIL,
    password: process.env.TEST_USER_PASSWORD,
  });
  await waitForLoginSuccess(page);
  await page.waitForSelector("text=Evaluare organizațională");

  await page.getByRole("link", { name: "Începe evaluarea" }).click();
  await page.locator('input[name="deadline"]').fill("2023-11-18");
  await page
    .locator('textarea[name="evaluations"]')
    .fill("platica.ciprian+invitation@gmail.com");
  await page.getByRole("button", { name: "Salvează detalii" }).click();

  const response = await page.waitForResponse(
    (response) =>
      response.request().method() === "GET" &&
      response.status() === 200 &&
      response.url().includes("/api/reports/")
  );
  const data = await response.json();
  await page.goto(
    `https://app.crestem.ong/evaluation/${
      data.evaluations[0].id
    }?email=${encodeURIComponent(data.evaluations[0].email)}`
  );
  await fillEvaluation(page);
  await page.waitForTimeout(5000);

  await await page.goto(`https://app.crestem.ong/reports/${data.id}`);

  await page.waitForResponse(
    (response) =>
      response.request().method() === "GET" &&
      response.status() === 200 &&
      response.url().includes(`/api/reports/${data.id}`)
  );

  await page.getByText("Finalizează evaluare").nth(0).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Finalizează evaluare" })
    .click();

  await page.waitForResponse(
    (response) =>
      response.request().method() === "PUT" &&
      response.status() === 200 &&
      response.url().includes("/api/reports/")
  );
  await page.waitForResponse(
    (response) =>
      response.request().method() === "GET" &&
      response.status() === 200 &&
      response.url().includes("/api/reports/")
  );
  await page.getByText("Accesează biblioteca");
});
