describe("Registration", () => {
  it("successfully creates user with minimum details", () => {
    cy.visit("/register");
    cy.findByLabelText("Numele organizației").type("ONG NAME");
    cy.findByLabelText("CIF-ul organizației").type("RO584233");
    cy.findByLabelText("Județ").type("Județ");
    cy.findByLabelText("Localitate").type("Județ");
    cy.findByLabelText("Email organizație").type("platica.ciprian@gmail.com");
    cy.findByLabelText("Telefon organizație").type("Telefon organizație");
    cy.findByLabelText("Parola").type("Hello12345");
    cy.findByLabelText("Confirmă parola").type("Hello12345");

    cy.findByRole("button", { name: /Salvează/i }).click();
  });
});
