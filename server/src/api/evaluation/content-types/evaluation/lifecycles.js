module.exports = {
  async afterCreate(event) {
    const { result } = event;
    const evaluationUrl = `${process.env.CLIENT_PUBLIC_URL}/evaluation/${
      result.id
    }?email=${encodeURIComponent(result.email)}`;
    const evaluationData = await strapi.entityService.findOne(
      "api::evaluation.evaluation",
      result.id,
      {
        populate: "report.user",
      }
    );
    const deadline = new Date(
      evaluationData.report.deadline
    ).toLocaleDateString("ro-RO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    try {
      await strapi.plugin("email-designer").service("email").sendTemplatedEmail(
        {
          to: result.email,
        },
        {
          templateReferenceId: 3,
        },
        {
          ONG_NAME: evaluationData.report.user.ongName,
          URL: evaluationUrl,
          DEADLINE: deadline,
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
  async afterUpdate(event) {
    const { result, params } = event;
    const dimensions = params.data.dimensions;
    if (dimensions.length === 10) {
      const data = await strapi.entityService.findOne(
        "api::evaluation.evaluation",
        result.id,
        {
          populate: ["report.evaluations.dimensions", "report.user"],
        }
      );
      const isLastEvaluationFromReport = !data.report.evaluations.reduce(
        (acc, evaluation) =>
          evaluation.dimensions.length === 10 ? acc || false : true,
        false
      );
      if (isLastEvaluationFromReport) {
        try {
          await strapi
            .plugin("email-designer")
            .service("email")
            .sendTemplatedEmail(
              {
                to: data.report.user.email,
              },
              {
                templateReferenceId: 4,
              }
            );
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
};
