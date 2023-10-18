import { faker } from "@faker-js/faker";

const user = {
  name: faker.company.name(),
  identificationNumber: faker.string.numeric({ length: 6 }),
  email: `platica.ciprian+${faker.string.uuid()}@gmail.com`,
  county: faker.location.county(),
  city: faker.location.city(),
  phone: faker.phone.number(),
  password: faker.internet.password({ length: 20 }),
};

describe("Registration", () => {
  it("successfully creates user with minimum details", () => {
    cy.visit("/register");
    cy.findByLabelText("Numele organizației").type(user.name);
    cy.findByLabelText("CIF-ul organizației").type(user.identificationNumber);
    cy.findByLabelText("Județ").type(user.county);
    cy.findByLabelText("Localitate").type(user.city);
    cy.findByLabelText("Email organizație").type(user.email);
    cy.findByLabelText("Telefon organizație").type(user.phone);
    cy.findByLabelText("Parola").type(user.password);
    cy.findByLabelText("Confirmă parola").type(user.password);

    // cy.findByRole("button", { name: /Salvează/i }).click();
  });
});
