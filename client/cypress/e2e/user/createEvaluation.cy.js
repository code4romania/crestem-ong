const user = {
  name: "platica.ciprian@gmail.com",
  password: "Hello12345",
};

let currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 30);
const deadline = currentDate.toISOString().split("T")[0];

describe("CreateEvaluation", () => {
  it("successfully creates an evaluation", () => {
    cy.visit("/login");
    cy.findByLabelText("Email").type(user.name);
    cy.findByLabelText("Parola").type(user.password);
    cy.findByRole("button", { name: /Intra in cont/i }).click();
    cy.findByRole("link", { name: /Începe evaluarea/i }).click();
    cy.findByLabelText("Dată final").type(deadline);
    cy.findByRole("textbox").type("platica.ciprian@gmail.com");
    cy.findByRole("button", { name: /Salvează detalii/i }).click();
  });
});
