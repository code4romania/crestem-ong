module.exports = ({ env }) => ({
  email: {
    config: {
      provider: "amazon-ses",
      providerOptions: {
        key: env("AWS_SES_KEY"),
        secret: env("AWS_SES_SECRET"),
        amazon: env("AWS_SES_AMAZON"),
      },
      settings: {
        defaultFrom: env("DEFAULT_FROM"),
        defaultReplyTo: env("DEFAULT_REPLY_TO"),
      },
    },
  },
});
