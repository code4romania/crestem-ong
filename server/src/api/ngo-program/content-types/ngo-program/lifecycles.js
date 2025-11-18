const { ValidationError } = require("@strapi/utils").errors;

module.exports = {
  async beforeCreate(event) {
    const ctx = strapi.requestContext.get();
    const data = event.params.data || {};

    const ngoId = data.ngo;
    const programId = data.program;

    if (!ngoId || !programId) {
      ctx.badRequest(`Program sau organizatie invalide`);
      throw new ValidationError(`Program sau organizatie invalide`);
    }

    // ✅ Check if a mentorship request between the same user and mentor already exists
    const existingNgoProgram = await strapi.db
      .query("api::ngo-program.ngo-program")
      .findOne({
        where: {
          program: { id: programId },
          ngo: { id: ngoId },
        },
      });

    if (existingNgoProgram) {
      ctx.badRequest(`Aceasta relatie exista deja`);
      throw new ValidationError(`Aceasta relatie exista deja`);
    }

    const ngoData = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ngoId,
      { populate: "role" }
    );

    if (ngoData?.role?.type?.toLowerCase() !== "authenticated") {
      ctx.badRequest(`Alege o organizatie valida`);
      throw new ValidationError(`Alege o organizatie valida`);
    }
  },
};
