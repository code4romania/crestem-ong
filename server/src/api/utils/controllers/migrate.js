module.exports = {
  async migrate(ctx) {
    const users = await strapi.entityService.findMany(
      "plugin::users-permissions.user",
      {
        populate: ["role", "program", "programs"],
      }
    );

    for (const user of users) {
      const role = user.role?.name?.toLowerCase();

      //
      // 1️⃣ NGO migration → create join records
      //
      if (role === "authenticated" && user.program) {
        await strapi.entityService.create("api::ngo-program.ngo-program", {
          data: {
            program: user.program.id,
            ngo: user.id,
          },
        });
      }

      //
      // 2️⃣ Mentor migration → create join records
      //
      if (role === "mentor" && user.programs?.length) {
        for (const program of user.programs) {
          await strapi.entityService.create(
            "api::mentor-program.mentor-program",
            {
              data: {
                program: program.id,
                mentor: user.id,
              },
            }
          );
        }
      }
    }

    ctx.body = { done: true };
  },
};
