"use strict";

/**
 * mentorship-request controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { UnauthorizedError } = require("@strapi/utils").errors;

const sendEmailToMentorFromUser = (to, data) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 10,
    },
    data
  );

module.exports = createCoreController(
  "api::mentorship-request.mentorship-request",
  ({ strapi }) => ({
    async create(ctx) {
      const { body } = ctx.request;
      const { user, mentor } = body?.data || {};
      if (mentor) {
        const mentorData = await strapi.entityService.findOne(
          "plugin::users-permissions.user",
          mentor,
          { populate: "role" }
        );
        if (user) {
          const userData = await strapi.entityService.findOne(
            "plugin::users-permissions.user",
            user,
            { populate: "role" }
          );

          if (userData?.role?.type !== "authenticated") {
            throw new UnauthorizedError(`Organizatia nu este valida`);
          }
          if (mentorData?.role?.type !== "mentor") {
            throw new UnauthorizedError(`Persoana resursa nu este valida`);
          }

          sendEmailToMentorFromUser(mentorData.email, {
            USER_EMAIL: userData.email,
          });

          const result = await strapi.entityService.create(
            "api::mentorship-request.mentorship-request",
            body
          );

          ctx.created(result);
        }
      }

      throw new UnauthorizedError(`A aparut o eroare`);
    },
  })
);
