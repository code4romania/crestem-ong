"use strict";

/**
 * mentorship-request controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const { PolicyError } = require("@strapi/utils").errors;

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
      if (!user || !mentor) {
        throw new PolicyError(`Organizatie sau persoana resursa invalide`);
      }

      const mentorData = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        mentor,
        { populate: "role" }
      );
      const userData = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        user,
        { populate: "role" }
      );

      if (userData?.role?.type !== "authenticated") {
        throw new PolicyError(`Organizatia nu este valida`);
      }
      if (mentorData?.role?.type !== "mentor") {
        throw new PolicyError(`Persoana resursa nu este valida`);
      }
      console.log("mentorData.email", mentorData.email, userData.ongName);

      sendEmailToMentorFromUser(mentorData.email, {
        USER_NAME: userData.ongName,
        USER_EMAIL: userData.email,
      }).catch((e) => {
        console.log("e", e);
        throw new PolicyError(`A aparut o eroare la trimiterea email-ului`);
      });

      const result = await strapi.entityService.create(
        "api::mentorship-request.mentorship-request",
        body
      );

      ctx.created(result);
    },
  })
);
