module.exports = {
  routes: [
    {
      method: "POST",
      path: "/migrate-programs",
      handler: "migrate.migrate",
      config: {
        policies: [],
      },
    },
  ],
};
