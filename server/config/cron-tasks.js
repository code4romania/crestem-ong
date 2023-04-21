const sendMailToReportUser = (to) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 1,
    }
  );

const sendMailToEvaluationUser = (to, data) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 2,
    },
    data
  );

module.exports = {
  /**
   * Update reports if they past the deadline.
   * Every day at midnight.
   */

  myJob: {
    task: async ({ strapi }) => {
      const reports = await strapi.entityService.findMany(
        "api::report.report",
        { populate: ["user", "evaluations"] }
      );
      const today = new Date();
      for await (const [index, report] of reports.entries()) {
        if (report.deadline) {
          const deadlineDate = new Date(report.deadline);
          const difference = deadlineDate.getTime() - today.getTime();
          const differenceInDays = Math.ceil(difference / (1000 * 3600 * 24));
          if (differenceInDays === 1) {
            try {
              await sendMailToReportUser(report.user.email);
            } catch (err) {
              console.log(err);
            }
            for await (const [_, evaluation] of reports.evaluations.entries()) {
              try {
                await sendMailToEvaluationUser(evaluation.email, {
                  REPORT: report,
                });
              } catch (err) {
                console.log(err);
              }
            }
          } else {
            if (today.getTime() >= deadlineDate.getTime() && !report.finished) {
              await strapi.entityService.update(
                "api::report.report",
                report.id,
                {
                  data: {
                    finished: true,
                  },
                }
              );
            }
          }
        }
      }
    },
    options: {
      rule: "0 0 * * *",
    },
  },
};
