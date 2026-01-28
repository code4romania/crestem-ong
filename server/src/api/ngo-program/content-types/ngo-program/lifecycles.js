const { ValidationError } = require("@strapi/utils").errors;

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

    const ngoId = getId(data.ngo);
    const programId = getId(data.program);

    if (!programId) {
      throw new ValidationError(`Program este obligatoriu`);
    }

    if (!ngoId) {
      throw new ValidationError(`Organizatia este obligatorie`);
    }

    // ✅ Check if program exists
    const programData = await strapi.entityService.findOne(
      "api::program.program",
      programId
    );

    if (!programData) {
      throw new ValidationError(`Programul selectat nu exista`);
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
      throw new ValidationError(
        `Aceasta relatie intre program si organizatie exista deja`
      );
    }

    const ngoData = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      ngoId,
      { populate: "role" }
    );

    if (!ngoData) {
      throw new ValidationError(`Organizatia nu exista`);
    }

    if (ngoData?.role?.type?.toLowerCase() !== "authenticated") {
      throw new ValidationError(`Organizatia selectata nu este valida`);
    }
  },
};
