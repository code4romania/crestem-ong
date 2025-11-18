const { ValidationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    const ctx = strapi.requestContext.get();
    const data = event.params.data || {};

    const programId = data.program;
    const mentorId = data.mentor;

    if (!programId || !mentorId) {
      ctx.badRequest(`Program sau persoana resursa invalide`);
      throw new ValidationError(`Program sau persoana resursa invalide`);
    }

    // ✅ Check if a mentorship request between the same user and mentor already exists
    const existingMentorProgram = await strapi.db
      .query("api::mentor-program.mentor-program")
      .findOne({
        where: {
          program: { id: programId },
          mentor: { id: mentorId },
        },
      });

    if (existingMentorProgram) {
      ctx.badRequest(
        `Aceasta relatie intre program si persoana resursa exista deja`
      );
      throw new ValidationError(
        `Aceasta relatie intre program si persoana resursa exista deja`
      );
    }

    const mentorData = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      mentorId,
      { populate: "role" }
    );

    if (mentorData?.role?.type !== "mentor") {
      ctx.badRequest(`Persoana resursa nu este valida`);
      throw new ValidationError(`Persoana resursa nu este valida`);
    }
  },
};
