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

const sendMailToMentorWhenMentorIsInvited = (to, data) =>
  strapi.plugin("email-designer").service("email").sendTemplatedEmail(
    {
      to,
    },
    {
      templateReferenceId: 9,
    },
    data
  );

module.exports = {
  async beforeCreate(event) {
    event.params.data.provider = "local";
    event.params.data.username = event.params.data.email;
    event.params.data.confirmed = true;
    if (!event.params.data.role) {
      event.params.data.role = 1;
    }
  },
  async afterCreate(event) {
    const { result, params } = event;
    if (!params.data.password || params.data.role === 4) {
      const registrationToken = strapi.service("admin::token").createToken();

      await strapi.plugin("users-permissions").service("user").edit(result.id, {
        registrationToken,
      });

      try {
        if (params.data.role === 4) {
          await sendMailToMentorWhenMentorIsInvited(result.email, {
            CODE: registrationToken,
          });
        } else {
          await sendMailToUserWhenUserIsInvited(result.email, {
            ONG_NAME: result.ongName,
            CODE: registrationToken,
          });
        }
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
