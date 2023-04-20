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
              await strapi.plugins["email"].services.email.send({
                to: report.user.email,
                subject: "Salut! A mai rămas o zi pînă la deadline",
                text: `Bună,\nMai e o singură zi în care persoanele din organizația ta pot completa chestionarul de evaluare.\nToți au primit o notificare automată ca reminder pentru a finaliza completarea chestionarului.\nDacă ai nevoie de mai mult timp, poți intra în contul tău de organizație și poți prelungi termenul de completare sau poți lua legătura cu echipa noastră pentru a te ajuta în acest proces.\n${process.env.CLIENT_PUBLIC_URL}/login\nO zi frumoasă!\nEchipa Creștem.ONG`,
                html: `<p>Bună,</p><p>Mai e o singură zi în care persoanele din organizația ta pot completa chestionarul de evaluare.</p><p>Toți au primit o notificare automată ca reminder pentru a finaliza completarea chestionarului.</p><p>Dacă ai nevoie de mai mult timp, poți intra în contul tău de organizație și poți prelungi termenul de completare sau poți lua legătura cu echipa noastră pentru a te ajuta în acest proces.</p><p><a href="${process.env.CLIENT_PUBLIC_URL}/login">${process.env.CLIENT_PUBLIC_URL}/login</a></p><p>O zi frumoasă!</p><p>Echipa Creștem.ONG</p>`,
              });
            } catch (err) {
              console.log(err);
            }
            for await (const [_, evaluation] of reports.evaluations.entries()) {
              try {
                await strapi.plugins["email"].services.email.send({
                  to: evaluation.email,
                  subject: "Salut! A mai rămas o zi pînă la deadline",
                  text: `Bună, Mai e o singură zi în care poți completa chestionarul de evaluare a ${report.user.ongName}. Dacă nu ai timp suficient, ia legătura cu organizația ta și solicită o extindere a termenului limită. O zi frumoasă! Echipa Creștem.ONG`,
                  html: `Bună, Mai e o singură zi în care poți completa chestionarul de evaluare a ${report.user.ongName}. Dacă nu ai timp suficient, ia legătura cu organizația ta și solicită o extindere a termenului limită. O zi frumoasă! Echipa Creștem.ONG`,
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
