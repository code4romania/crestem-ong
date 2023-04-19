module.exports = {
  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event;
    const evaluationUrl = `${process.env.CLIENT_PUBLIC_URL}/evaluation/${result.id}?email=${result.email}`;
    const data = await strapi.entityService.findOne(
      "api::evaluation.evaluation",
      result.id,
      {
        populate: "report.user",
      }
    );
    const deadline = new Date(data.report.deadline).toLocaleDateString(
      "ro-RO",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );
    try {
      await strapi.plugins["email"].services.email.send({
        to: result.email,
        subject:
          "Salut! Ai fost invitat să răspunzi la un chestionar Crestem.ONG",
        text: `Bună,\nAi primit o invitație să răspunzi la un chestionar de evaluare al organizației ${data.report.user.ongName}. Acest chestionar vă ajută să identificați nevoile, punctele tari și cele de îmbunătățit ale ONGului din mai multe perspective de dezvoltare organizațională.Deadline-ul de completare pentru chestionar este: ${deadline}\nLink: ${evaluationUrl}\nMulțumim!\nEchipa Creștem.ONG`,
        html: `<p>Bună,</p><p>Ai primit o invitație să răspunzi la un chestionar de evaluare al organizației ${data.report.user.ongName}.</p><p>Acest chestionar vă ajută să identificați nevoile, punctele tari și cele de îmbunătățit ale ONGului din mai multe perspective de dezvoltare organizațională.</p><p>Deadline-ul de completare pentru chestionar este: ${deadline}</p><p>Link: ${evaluationUrl}</p><p>Mulțumim!</p><p>Echipa Creștem.ONG</p>`,
      });
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
          populate: "report.evaluations.dimensions",
        }
      );
      const isLastEvaluationFromReport = !data.report.evaluations.reduce(
        (acc, evaluation) =>
          evaluation.dimensions.length === 10 ? acc || false : true,
        false
      );
      if (isLastEvaluationFromReport) {
        try {
          await strapi.plugins["email"].services.email.send({
            to: result.email,
            subject:
              "Salut! Toți membrii organizației au completat chestionarele transmise",
            text: `Bună,\nToate persoanele invitate de tine să completeze chestionarul de dezvoltare organizațională a finalizat.\nPoți intra în contul tău să finalizezi evaluarea și să vezi rezultatele: https://crestem-ong.vercel.app/login\nO zi frumoasă!\nEchipa Creștem.ONG`,
            html: `<p>Bună,</p><p>Toate persoanele invitate de tine să completeze chestionarul de dezvoltare organizațională a finalizat.</p><p>Poți intra în contul tău să finalizezi evaluarea și să vezi rezultatele: <a href="https://crestem-ong.vercel.app/login">https://crestem-ong.vercel.app/login</a></p><p>O zi frumoasă!</p><p>Echipa Creștem.ONG</p>`,
          });
        } catch (err) {
          console.log(err);
        }
      }
    }
  },
};
