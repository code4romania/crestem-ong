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

const sendMailToUserWhenUserIsInvited = (to, data) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 8,
    },
    data
  );

module.exports = {
  async afterCreate(event) {
    const { result, params } = event;

    if (!params.data.createdBy) {
      const registrationToken = strapi.service("admin::token").createToken();
      await strapi.plugin("users-permissions").service("user").edit(result.id, {
        username: result.email,
        registrationToken,
        provider: "local",
        role: 1,
        confirmed: true,
      });

      try {
        await sendMailToUserWhenUserIsInvited(result.email, {
          ONG_NAME: result.ongName,
          CODE: registrationToken,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        await sendMailToAdminWhenUserIsCreated("crestem.ong@fdsc.ro", {
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
    }
  },
};
