module.exports = {
  /**
   * Update reports if they past the deadline.
   * Every day at midnight.
   */

  myJob: {
    task: async ({ strapi }) => {
      const reports = await strapi.entityService.findMany("api::report.report");
      const today = new Date();
      for await (const [index, report] of reports.entries()) {
        if (report.deadline) {
          const deadlineDate = new Date(report.deadline);
          if (today.getTime() >= deadlineDate.getTime() && !report.finished) {
            await strapi.entityService.update("api::report.report", report.id, {
              data: {
                finished: true,
              },
            });
          }
        }
      }
    },
    options: {
      rule: "0 0 * * *",
    },
  },
};
