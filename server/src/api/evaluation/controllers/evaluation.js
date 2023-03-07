"use strict";

/**
 * evaluation controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { UnauthorizedError } = require("@strapi/utils").errors;

module.exports = createCoreController(
  "api::evaluation.evaluation",
  ({ strapi }) => ({
    async findOne(ctx) {
      const urlParams = new URLSearchParams(ctx.request.url.split("?")[1]);
      const response = await super.findOne(ctx);
      if (response?.data?.attributes?.email !== urlParams.get("email")) {
        throw new UnauthorizedError('Sorry, you are not authorized to access this page.');
      } else {
        return response;
      }
    },
  })
);
