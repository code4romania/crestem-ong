const user = require("./content-types/user");

module.exports = (plugin) => {
  plugin.contentTypes.user = user;

  return plugin;
};
