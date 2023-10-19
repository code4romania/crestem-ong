import { test, expect } from "@playwright/test";
import { login, waitForLoginError, waitForLoginSuccess } from "../utils/login";

test("success", async ({ page }) => {
  await login(page, {
    email: process.env.TEST_MENTOR_EMAIL,
    password: process.env.TEST_MENTOR_PASSWORD,
  });
  await waitForLoginSuccess(page);

  await page.waitForSelector("text=Evaluare organizațională");
});

test("error message", async ({ page }) => {
  await login(page, {
    email: process.env.TEST_MENTOR_EMAIL,
    password: "wrong-password",
  });
  await waitForLoginError(page);
});
