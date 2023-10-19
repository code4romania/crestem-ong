export const login = async (page, { email, password }) => {
  await page.goto("https://app.crestem.ong/login");
  await page.getByPlaceholder("Introdu email").click();
  await page.getByPlaceholder("Introdu email").fill(email);
  await page.getByPlaceholder("Introdu email").press("Tab");
  await page.getByPlaceholder("Introdu parola").fill(password);
  await page.getByRole("button", { name: "Intra in cont" }).click();
};

export const waitForLoginSuccess = async (page) => {
  await page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/auth/local") && response.status() === 200
  );
  await page.waitForResponse(
    (response) =>
      response
        .url()
        .endsWith(
          "/api/users/me?populate[0]=reports.evaluations.dimensions.quiz&populate[1]=avatar&populate[2]=role&populate[3]=programs.users&populate[4]=userActivities&populate[5]=mentorActivities.user&populate[6]=mentorActivities.type&populate[7]=mentorActivities.dimension&populate[8]=program&populate[9]=dimensions"
        ) && response.status() === 200
  );
};

export const waitForLoginError = async (page) => {
  await page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/auth/local") && response.status() === 400
  );

  await page.waitForSelector(
    "text=Credențialele introduse nu sunt corecte. Vă rugăm să verificați și să încercați din nou."
  );
};
