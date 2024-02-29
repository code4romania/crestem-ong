"use strict";

/**
 * report controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { deadlineHasPassed } = require("../../../helpers/reports");

module.exports = createCoreController("api::report.report", ({ strapi }) => ({
  async create(ctx) {
    const { user } = ctx.state;
    const { deadline } = ctx.request.body.data || {};
    const { evaluations } = ctx.request.body.data;
    const result = await strapi.entityService.create("api::report.report", {
      data: {
        user: user.id,
        deadline,
      },
    });
    for (const evaluation of evaluations) {
      await strapi.entityService.create("api::evaluation.evaluation", {
        data: {
          report: result.id,
          ...evaluation,
        },
      });
    }
    ctx.created(result);
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.entityService.findOne("api::report.report", id, {
      populate: ["evaluations.dimensions.quiz", "user"],
    });

    if (deadlineHasPassed(data.deadline)) {
      data.finished = true;
    }

    return data;
  },
}));
