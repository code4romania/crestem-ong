module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "amazon-ses",
      providerOptions: {
        key: env("AWS_SES_KEY"),
        secret: env("AWS_SES_SECRET"),
        amazon: "https://email.eu-central-1.amazonaws.com",
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM"),
        defaultReplyTo: env("DEFAULT_REPLY_TO"),
      },
    },
  },
});
