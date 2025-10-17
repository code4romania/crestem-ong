"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::activity.activity",
  ({ strapi }) => ({
    /**
     * Find only activities where current user is mentor (or admin/FDSC can see all)
     */
    async find(ctx) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const isFDSC = ctx.state?.user?.role?.type === "fdsc";

      const { query } = ctx;

      const filters = isFDSC
        ? query.filters
        : { ...query.filters, mentor: { id: { $eq: user.id } } };

      const activities = await strapi.entityService.findMany(
        "api::activity.activity",
        {
          ...query,
          filters,
          populate: ["mentor", "user", "type", "dimension"],
          sort: [{ startDate: "desc" }],
        }
      );

      return activities;
    },

    /**
     * Return one activity only if current user is its mentor (or FDSC)
     */
    async findOne(ctx) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const { id } = ctx.params;
      const activity = await strapi.entityService.findOne(
        "api::activity.activity",
        id,
        {
          populate: ["mentor", "user", "type", "dimension"],
        }
      );

      if (!activity) {
        return ctx.notFound("Activity not found");
      }

      const isFDSC = ctx.state?.user?.role?.type === "fdsc";

      if (!isFDSC && activity.mentor?.id !== user.id) {
        return ctx.forbidden("You do not have access to this activity");
      }

      return activity;
    },

    /**
     * Delete only if current user is mentor or FDSC
     */
    async delete(ctx) {
      const user = ctx.state.user;
      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      const { id } = ctx.params;
      const activity = await strapi.entityService.findOne(
        "api::activity.activity",
        id,
        {
          populate: ["mentor"],
        }
      );

      if (!activity) {
        return ctx.notFound("Activity not found");
      }
      const isFDSC = ctx.state?.user?.role?.type === "fdsc";

      if (!isFDSC && activity.mentor?.id !== user.id) {
        return ctx.forbidden(
          "You do not have permission to delete this activity"
        );
      }

      const deleted = await strapi.entityService.delete(
        "api::activity.activity",
        id
      );
      return deleted;
    },
  })
);
