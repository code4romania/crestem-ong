const { PolicyError, ValidationError } = require("@strapi/utils").errors;

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

// Extract IDs for relational fields
// Strapi uses { connect: [{ id: 1 }] } when connecting relations
const getId = (relation) => {
  if (!relation) return null;
  if (typeof relation === "number") return relation; // already an ID
  if (relation?.connect?.length) return relation.connect[0].id;
  return null;
};
module.exports = {
  async beforeCreate(event) {
    const ctx = strapi.requestContext.get();
    const data = event.params.data || {};

    const userId = getId(data.user);
    const mentorId = getId(data.mentor);

    if (!userId || !mentorId) {
      ctx.badRequest(`Organizatie sau persoana resursa invalide`);
      throw new ValidationError(`Organizatie sau persoana resursa invalide`);
    }

    const mentorData = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      mentorId,
      { populate: "role" }
    );

    const userData = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      userId,
      { populate: ["role"] }
    );

    if (userData?.role?.type !== "authenticated") {
      ctx.badRequest(`Organizatia nu este valida`);
      throw new ValidationError(`Organizatia nu este valida`);
    }

    if (mentorData?.role?.type !== "mentor") {
      ctx.badRequest(`Persoana resursa nu este valida`);
      throw new ValidationError(`Persoana resursa nu este valida`);
    }
  },

  async afterCreate(event) {
    const { result } = event;
    const { user, mentor } = await strapi.entityService.findOne(
      "api::mentorship-request.mentorship-request",
      result.id,
      {
        populate: [
          "user",
          "mentor",
          "user.role",
          "mentor.role",
          "user.reports",
        ],
      }
    );

    const reportId = user.reports
      .filter(({ finished }) => finished)
      .sort(({ createdAt }) => createdAt)
      .reverse()
      .at(0);

    try {
      await sendEmailToMentorFromUser(mentor.email, {
        USER_NAME: user.ongName,
        USER_EMAIL: user.email,
        REPORT_ID: reportId,
      });
    } catch (e) {
      strapi.log.error(`Eroare la trimiterea email-ului: ${e}`);
    }
  },
};
