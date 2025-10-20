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
      if (!user) return ctx.unauthorized("You must be logged in");

      const isFDSC = user?.role?.type === "fdsc";
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

      return activities.map((a) => ({
        ...a,
        mentor: a.mentor ? sanitizeUser(a.mentor) : null,
        user: a.user ? sanitizeUser(a.user) : null,
      }));
    },

    /**
     * Return one activity only if current user is its mentor (or FDSC)
     */
    async findOne(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("You must be logged in");

      const { id } = ctx.params;
      const activity = await strapi.entityService.findOne(
        "api::activity.activity",
        id,
        { populate: ["mentor", "user", "type", "dimension"] }
      );

      if (!activity) return ctx.notFound("Activity not found");

      const isFDSC = user?.role?.type === "fdsc";
      if (!isFDSC && activity.mentor?.id !== user.id) {
        return ctx.forbidden("You do not have access to this activity");
      }

      return {
        ...activity,
        mentor: activity.mentor ? sanitizeUser(activity.mentor) : null,
        user: activity.user ? sanitizeUser(activity.user) : null,
      };
    },

    /**
     * Update only if current user is mentor of the activity
     */
    async update(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("You must be logged in");

      const { id } = ctx.params;
      const existing = await strapi.entityService.findOne(
        "api::activity.activity",
        id,
        { populate: ["mentor", "user"] }
      );

      if (!existing) return ctx.notFound("Activity not found");

      if (existing.mentor?.id !== user.id) {
        return ctx.forbidden(
          "You do not have permission to update this activity"
        );
      }

      const updated = await strapi.entityService.update(
        "api::activity.activity",
        id,
        {
          data: ctx.request.body.data,
          populate: ["mentor", "user", "type", "dimension"],
        }
      );

      return {
        ...updated,
        mentor: updated.mentor ? sanitizeUser(updated.mentor) : null,
        user: updated.user ? sanitizeUser(updated.user) : null,
      };
    },

    /**
     * Delete only if current user is mentor
     */
    async delete(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("You must be logged in");

      const { id } = ctx.params;
      const activity = await strapi.entityService.findOne(
        "api::activity.activity",
        id,
        { populate: ["mentor", "user"] }
      );

      if (!activity) return ctx.notFound("Activity not found");

      if (activity.mentor?.id !== user.id) {
        return ctx.forbidden(
          "You do not have permission to delete this activity"
        );
      }

      const deleted = await strapi.entityService.delete(
        "api::activity.activity",
        id
      );

      return {
        ...deleted,
        mentor: deleted.mentor ? sanitizeUser(deleted.mentor) : null,
        user: deleted.user ? sanitizeUser(deleted.user) : null,
      };
    },
  })
);

/**
 * 🧼 Helper to remove sensitive fields from user objects
 */
function sanitizeUser(user) {
  if (!user) return null;
  const {
    password,
    resetPasswordToken,
    confirmationToken,
    created_by,
    updated_by,
    ...safe
  } = user;
  return safe;
}
