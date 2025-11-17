module.exports = {
  async migrate(ctx) {
    const users = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        populate: ["role", "program", "programs"],
      }
    );

    for (const user of users) {
      const role = user.role?.name;

      if (role === "Authenticated" && user.program) {
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          user.id,
          {
            data: {
              ngoPrograms: [user.program.id],
            },
          }
        );
      }

      if (role === "Mentor" && user.programs?.length) {
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          user.id,
          {
            data: {
              mentorPrograms: user.programs.map((p) => p.id),
            },
          }
        );
      }
    }

    ctx.body = { done: true };
  },
};
