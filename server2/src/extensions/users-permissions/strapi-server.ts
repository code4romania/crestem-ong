import { pick } from "remeda";
import * as magicLink from "./services/magic-link";
import customRoutes from "./routes/user";

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
  return pick(user, ["id", "email", "ongName"]);
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

export default (plugin) => {
  plugin.controllers.auth.findRegistrationInfo = findRegistrationInfo;
  plugin.controllers.auth.registerWithConfirmation = registerWithConfirmation;

  const userServices = plugin.services.user;
  plugin.services.user = (params) => {
    const services = userServices(params);
    return {
      ...services,
      magicLink,
    };
  };
  plugin.routes["content-api"].routes.push(...customRoutes);
  return plugin;
};
