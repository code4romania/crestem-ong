const sendMailToReportUser = async (strapi, to) => {
  try {
    await strapi.plugin("email-designer").service("email").sendTemplatedEmail(
      {
        to,
      },
      {
        templateReferenceId: 1,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

const sendMailToEvaluationUser = async (strapi, to, data) => {
  try {
    await strapi.plugin("email-designer").service("email").sendTemplatedEmail(
      {
        to,
      },
      {
        templateReferenceId: 2,
      },
      {
        REPORT: data,
      }
    );
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  /**
   * Update reports if they past the deadline.
   * Every day at midnight.
   */
  updateExpiredReports: {
    task: async ({ strapi }) => {
      const reports = await strapi.entityService.findMany(
        "api::report.report",
        {
          filters: {
            finished: false,
          },
          populate: ["user", "evaluations"],
        }
      );
      const today = new Date();
      for await (const [_, report] of reports.entries()) {
        if (!report.deadline) {
          continue;
        }

        const deadlineDate = new Date(report.deadline);
        const difference = deadlineDate.getTime() - today.getTime();
        const differenceInHours = Math.ceil(difference / (1000 * 3600));
        if (differenceInHours > 0 && differenceInHours <= 24) {
          await sendMailToReportUser(strapi, report.user.email);

          for await (const [_, evaluation] of report.evaluations.entries()) {
            await sendMailToEvaluationUser(strapi, evaluation.email, report);
          }
        } else if (today.getTime() >= deadlineDate.getTime() && !report.finished) {
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
    },
    options: {
      rule: "* * * * *",
    },
  },
};
