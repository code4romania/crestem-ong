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
  upload: {
    config: {
      provider: "strapi-provider-upload-aws-s3-advanced",
      providerOptions: {
        accessKeyId: env("AWS_ACCESS_KEY_ID"),
        secretAccessKey: env("AWS_ACCESS_SECRET"),
        region: env("AWS_REGION"),
        params: {
          bucket: env("AWS_BUCKET"), // or "Bucket", @aws-sdk requires capitalized properties, but the convention for this file is lowercased, but the plugin understands both
          acl: env("AWS_BUCKET_ACL"), // or "ACL", see above
        },
        baseUrl: env("CDN_BASE_URL"), // e.g. "https://cdn.example.com", this is stored in strapi's database to point to the file
        prefix: env("BUCKET_PREFIX"), // e.g. "strapi-assets". If BUCKET_PREFIX contains leading or trailing slashes, they are removed internally to construct the URL safely
      },
    },
  },
  "import-export-entries": {
    enabled: true,
  },
  "email-designer": {
    enabled: true,

    // ⬇︎ Add the config property
    config: {
      editor: {
        // optional - if you have a premium unlayer account
        // projectId: [UNLAYER_PROJECT_ID],

        tools: {
          heading: {
            properties: {
              text: {
                value: "This is the new default text!",
              },
            },
          },
        },
        options: {
          features: {
            colorPicker: {
              presets: ["#D9E3F0", "#F47373", "#697689", "#37D67A"],
            },
          },
          fonts: {
            showDefaultFonts: false,
            /*
             * If you want use a custom font you need a premium unlayer account and pass a projectId number :-(
             */
            customFonts: [
              {
                label: "Anton",
                value: "'Anton', sans-serif",
                url: "https://fonts.googleapis.com/css?family=Anton",
              },
              {
                label: "Lato",
                value: "'Lato', Tahoma, Verdana, sans-serif",
                url: "https://fonts.googleapis.com/css?family=Lato",
              },
              // ...
            ],
          },
          // mergeTags: [
          //   {
          //     name: "Email",
          //     value: "{{= USER.username }}",
          //     sample: "john@doe.com",
          //   },
          //   // ...
          // ],
        },
        appearance: {
          theme: "dark",
          panels: {
            tools: {
              dock: "left",
            },
          },
        },
      },
    },
  },
  "config-sync": {
    enabled: true,
    config: {
      syncDir: "config/sync/",
      minify: false,
      soft: false,
      importOnBootstrap: false,
      customTypes: [],
      excludedTypes: [],
      excludedConfig: [
        "core-store.plugin_users-permissions_grant",
        "core-store.plugin_upload_metrics",
        "core-store.strapi_content_types_schema",
        "core-store.ee_information",
      ],
    },
  },
});
