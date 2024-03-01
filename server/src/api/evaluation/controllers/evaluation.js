"use strict";

/**
 * evaluation controller
 */
const sendMailToUserWhenEvaluationIsFinished = (to, data) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 7,
    },
    data
  );

const { createCoreController } = require("@strapi/strapi").factories;
const { UnauthorizedError, ForbiddenError } = require("@strapi/utils").errors;
const { deadlineHasPassed } = require("../../../helpers/reports");

module.exports = createCoreController(
  "api::evaluation.evaluation",
  ({ strapi }) => ({
    async findOne(ctx) {
      const isFDSC = ctx.state?.user?.role?.type === "fdsc";
      const { id } = ctx.params;
      const { email } = ctx.query;
      const data = await strapi.entityService.findOne(
        "api::evaluation.evaluation",
        id,
        {
          populate: ["report.user", "dimensions.quiz"],
        }
      );
      const { report, email: userEmail, ...response } = data;

      if ((report.finished || deadlineHasPassed(report.deadline)) && !isFDSC) {
        throw new UnauthorizedError(
          `Perioada de evaluare a luat sfarsit. Va rugam luati legatura cu organizatia ${report.user.ongName} pentru mai multe detalii.`
        );
      }
      if (userEmail !== email) {
        throw new ForbiddenError(
          "Sorry, you are not authorized to access this page."
        );
      } else {
        return response;
      }
    },
    async update(ctx) {
      const response = await super.update(ctx);
      const { dimensions } = ctx.request.body.data;
      const matrix = await strapi.entityService.findMany("api::matrix.matrix", {
        populate: "dimensions.quiz",
      });
      if (dimensions?.length === matrix?.dimensions?.length) {
        const mailHtml = matrix?.dimensions.reduce(
          (acc, { name, quiz }, dimensionIndex) => {
            return `${acc}\n<h2>${name}</h2>${quiz.reduce(
              (acc, matrixQuiz, quizIndex) =>
                `${acc}<h3>Intrebare: ${matrixQuiz.question}</h3><p>Raspuns: ${matrixQuiz[
                `option_${+dimensions[dimensionIndex]?.quiz[quizIndex]?.answer + 1
                }`
                ]
                }</p>`,
              ""
            )}${dimensions[dimensionIndex]?.comment &&
            `<div style="padding: 1em 0 1em 0"><b>Argumentare:</b> ${dimensions[dimensionIndex]?.comment}</p>`
              }
            <hr>
            `;
          },
          ""
        );
        try {
          const email = response?.data?.attributes?.email;
          const evaluation = await strapi.entityService.findOne(
            "api::evaluation.evaluation",
            response.data.id,
            {
              populate: "report.user",
            }
          );
          if (email) {
            await sendMailToUserWhenEvaluationIsFinished(email, {
              EVALUATION_RESULTS: mailHtml,
              ONG_NAME: evaluation?.report?.user?.ongName,
            });
          }
        } catch (err) {
          console.log(err);
        }
      }
      return response;
    },
    async delete(ctx) {
      const { id } = ctx.params;
      const data = await strapi.entityService.findOne(
        "api::evaluation.evaluation",
        id,
        {
          populate: ["report"],
        }
      );

      if (data.report.finished || deadlineHasPassed(data.report.deadline)) {
        throw new ForbiddenError(
          `Perioada de evaluare a luat sfarsit. Evaluarea nu poate fi ștearsă.`
        );
      }

      return await strapi.entityService.delete('api::evaluation.evaluation', data.id);
    }
  })
);
