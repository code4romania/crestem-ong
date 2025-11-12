"use strict";

/**
 * mentorship-request controller
 */
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::mentorship-request.mentorship-request",
  ({ strapi }) => ({
    /**
     * Find mentorship requests based on user role
     */
    async find(ctx) {
      const user = ctx.state?.user;
      if (!user) return ctx.unauthorized("You must be logged in");

      const { query } = ctx;
      const roleName = user?.role?.type;

      if (!["mentor", "authenticated", "fdsc"].includes(roleName)) {
        return ctx.forbidden(
          "You do not have permission to access mentorship requests"
        );
      }

      let filters = query.filters || {};
      if (roleName === "mentor") {
        filters = { ...filters, mentor: { id: { $eq: user.id } } };
      } else if (roleName === "authenticated") {
        filters = { ...filters, user: { id: { $eq: user.id } } };
      }

      const entities = await strapi.entityService.findMany(
        "api::mentorship-request.mentorship-request",
        {
          ...query,
          filters,
          populate: [
            "user",
            "mentor",
            "user.domains",
            "user.dimensions",
            "user.reports",
          ],
          sort: [{ createdAt: "desc" }],
        }
      );

      // Sanitize first (to respect Strapi’s policies)
      const sanitizedEntities = await this.sanitizeOutput(entities, ctx);

      // Add `lastReport` field based on user.reports
      const withLastReport = sanitizedEntities.map((entity) => {
        const reports = entity.user?.reports || [];
        const lastReport = reports.length ? reports[reports.length - 1] : null;

        return {
          ...entity,
          user: {
            ...entity.user,
            lastReportAt: lastReport ? lastReport.createdAt : null,
          },
        };
      });

      return withLastReport;
    },

    /**
     * Find one mentorship request with role-based access
     */
    async findOne(ctx) {
      const user = ctx.state.user;
      if (!user) return ctx.unauthorized("You must be logged in");

      const roleName = user.role?.name?.toLowerCase();
      if (!["mentor", "authenticated", "fdsc"].includes(roleName)) {
        return ctx.forbidden(
          "You do not have permission to access mentorship requests"
        );
      }

      const { id } = ctx.params;
      const entity = await strapi.entityService.findOne(
        "api::mentorship-request.mentorship-request",
        id,
        {
          populate: ["mentor", "user", "user.reports"],
        }
      );

      if (!entity) return ctx.notFound("Mentorship request not found");

      if (roleName === "mentor" && entity.mentor?.id !== user.id)
        return ctx.notFound("Mentorship request not found");
      if (roleName === "authenticated" && entity.user?.id !== user.id)
        return ctx.notFound("Mentorship request not found");

      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      const reports = sanitizedEntity.user?.reports || [];
      const lastReport = reports.length ? reports[reports.length - 1] : null;

      return {
        ...sanitizedEntity,
        user: {
          ...sanitizedEntity.user,
          lastReportAt: lastReport ? lastReport.createdAt : null,
        },
      };
    },
  })
);
