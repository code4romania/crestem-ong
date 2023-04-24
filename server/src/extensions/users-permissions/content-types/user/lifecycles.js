const sendMailToAdminWhenUserIsCreated = (to, data) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 5,
    },
    data
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
      await sendMailToAdminWhenUserIsCreated("olivia.vereha@code4.ro", {
        ONG_NAME: result.ongName,
      });
    } catch (err) {
      console.log(err);
    }
    try {
      await sendMailToUserWhenUserIsCreated(result.email);
    } catch (err) {
      console.log(err);
    }
  },
};
