module.exports = {
  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event;
    const evaluationUrl = `${process.env.CLIENT_PUBLIC_URL}/evaluation/${result.id}?email=${result.email}`;
    try {
      await strapi.plugins["email"].services.email.send({
        to: result.email,
        subject:
          "CRESTEM-ONG: Ati fost invitat pentru a completa formularul de evaluare a organizatiei",
        text: `Accesati link-ul urmator pentru a accessa formularul de evaluarea a organizatiei ${evaluationUrl}`,
        html: `Accesati link-ul urmator pentru a accessa formularul de evaluarea a organizatiei <a href="${evaluationUrl}">${evaluationUrl}</a>`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
