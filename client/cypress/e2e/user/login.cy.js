const user = {
  name: "platica.ciprian@gmail.com",
  password: "Hello12345",
};

describe("Login", () => {
  it("successfully login with predefined credentials", () => {
    cy.intercept("**/api/auth/local").as("login");
    cy.intercept("**/api/users/me*").as("profile");

    cy.visit("/login");
    cy.findByLabelText("Email").type(user.name);
    cy.findByLabelText("Parola").type(user.password);
    cy.findByRole("button", { name: /Intra in cont/i }).click();

    cy.wait("@login");
    cy.wait("@profile");
  });
});
