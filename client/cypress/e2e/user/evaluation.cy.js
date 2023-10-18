const user = {
  name: "platica.ciprian@gmail.com",
  password: "Hello12345",
};

let currentDate = new Date();
currentDate.setDate(currentDate.getDate() + 30);
const deadline = currentDate.toISOString().split("T")[0];

const evaluationId = 49;
const email = "platica.ciprian@gmail.com";

function transformToRegexPattern(inputStr) {
  let escapedStr = inputStr
    .toLowerCase()
    .replace(/\./g, "\\.")
    .replace(/\//g, "\\/")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");

  return `/^${escapedStr}$/i`;
}
describe("Evaluation", async () => {
  it("successfully creates an evaluation", async () => {
    cy.intercept("/api/matrix*").as("matrix");
    cy.intercept("/api/evaluations/*").as("evaluation");
    cy.intercept("PUT", "/api/evaluations/*").as("updateEvaluation");

    cy.visit(`/evaluation/${evaluationId}?email=${email}`);

    cy.wait("@evaluation").then(
      ({
        response: {
          body: { dimensions },
        },
      }) => {
        console.log("dimensions", dimensions);
        if (!dimensions.length) {
          cy.findByRole("button", { name: /Începe evaluarea/i }).click();
        }
        cy.wait("@matrix").then(
          ({
            response: {
              body: {
                data: {
                  attributes: {
                    dimensions: { data },
                  },
                },
              },
            },
          }) => {
            const remainingDimensions = [...Array(10 - dimensions.length)];
            remainingDimensions.forEach((_, index) => {
              const currentDimensionIndex = dimensions.length + index;
              data[currentDimensionIndex].attributes.quiz.forEach((quiz) => {
                cy.findAllByText(
                  quiz[`option_${Math.floor(Math.random() * 4) + 2}`].substring(
                    0,
                    25
                  ),
                  { exact: false }
                ).click({ multiple: true });
              });
              cy.findByRole("textbox").type("test");
              cy.findByRole("button", {
                name: currentDimensionIndex === 9 ? /Trimite/i : /Continuă/i,
              }).click();
              cy.wait("@updateEvaluation");
            });
            cy.findByText(/Răspunsurile tale au fost trimise cu succes!/i);
          }
        );
      }
    );
  });
});
