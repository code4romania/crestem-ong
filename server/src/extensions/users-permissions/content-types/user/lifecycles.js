const sendMailToAdminWhenUserIsCreated = (to) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 5,
    }
  );
const sendMailToUserWhenUserIsCreated = (to, data) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 6,
    },
    data
  );

module.exports = {
  async afterCreate(event) {
    const { result } = event;
    try {
      await sendMailToAdminWhenUserIsCreated(result.email);
    } catch (err) {
      console.log(err);
    }
    try {
      await sendMailToUserWhenUserIsCreated("olivia.vereha@code4.ro", {
        ONG_NAME: result.ongName,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
