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

    const programId = getId(data.program);
    const mentorId = getId(data.mentor);

    if (!mentorId) {
      throw new ValidationError(`Persoana resursa este obligatorie`);
    }

    if (!programId) {
      throw new ValidationError(`Program este obligatoriu`);
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
    const existingMentorProgram = await strapi.db
      .query("api::mentor-program.mentor-program")
      .findOne({
        where: {
          program: { id: programId },
          mentor: { id: mentorId },
        },
      });

    if (existingMentorProgram) {
      throw new ValidationError(
        `Aceasta relatie intre program si persoana resursa exista deja`
      );
    }

    const mentorData = await strapi.entityService.findOne(
      "plugin::users-permissions.user",
      mentorId,
      { populate: "role" }
    );

    if (!mentorData) {
      throw new ValidationError(`Persoana resursa nu exista`);
    }

    if (mentorData?.role?.type !== "mentor") {
      throw new ValidationError(`Persoana resursa nu este valida`);
    }
  },
};
