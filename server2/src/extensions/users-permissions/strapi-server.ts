import { pick } from "remeda";

module.exports = (plugin) => {
  // Override auth controller
  const originalAuhtControllerFactory = plugin.controllers.auth;
  plugin.controllers.auth = ({ strapi }) => {
    const controller = originalAuhtControllerFactory({ strapi });

    controller.findRegistrationInfo = async (ctx) => {
      const { registrationToken } = ctx.query;
      if (!registrationToken) {
        return ctx.badRequest("No registrationToken");
      }
      let user = await strapi
        .query("plugin::users-permissions.user")
        .findOne({ where: { registrationToken } });

      if (!user) {
        return undefined;
      }
      return pick(user, ["id", "email", "ongName"]);
    };

    controller.registerWithConfirmation = async (ctx) => {
      const { data } = ctx.request.body;
      const id = data?.id;
      if (!id) {
        return ctx.badRequest("Missing user id");
      }
      const user = await strapi.entityService.update(
        "plugin::users-permissions.user",
        id,
        {
          data: { password: data.password, registrationToken: null },
        }
      );
      if (!user) {
        return ctx.badRequest("Failed to register");
      }
      return user;
    };

    return controller;
  };

  // Add the new route for reset password
  plugin.routes["content-api"].routes.push(
    {
      method: "GET",
      path: "/registration-info",
      handler: "auth.findRegistrationInfo",
    },
    {
      method: "POST",
      path: "/register",
      handler: "auth.registerWithConfirmation",
    }
  );

  return plugin;
};
