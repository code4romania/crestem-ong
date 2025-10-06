const user = require("./content-types/user");
const _ = require("lodash");

const findRegistrationInfo = async (ctx) => {
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
  return _.pick(user, ["id", "email", "ongName", "firstName", "lastName"]);
};

const registerWithConfirmation = async (ctx) => {
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

module.exports = (plugin) => {
  plugin.contentTypes.user = user;
  plugin.controllers.auth.findRegistrationInfo = findRegistrationInfo;
  plugin.controllers.auth.registerWithConfirmation = registerWithConfirmation;

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
