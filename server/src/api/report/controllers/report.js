"use strict";

/**
 * report controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::report.report", ({ strapi }) => ({
  async create(ctx) {
    const { user } = ctx.state;
    const data = await strapi.entityService.create("api::report.report", {
      data: {
        user: user.id,
      },
    });
    ctx.created(data);
  },
  async findOne(ctx) {
    const { id } = ctx.params;
    const data = await strapi.entityService.findOne("api::report.report", id, {
      populate: 'evaluations.dimensions.quiz'
    });
    return data;
  },
}));
