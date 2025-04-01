// export default () => ({});
module.exports = ({ env }) => ({
    // ...
    slugify: {
      enabled: true,
      config: {
        contentTypes: {
          articles: {
            field: 'slug',
            references: 'title',
          },
        },
      },
    },
    "content-manager": {
      relation: {
        fetchLimit: 100, // Increase this number as needed
      },
    },
    // ...
    email: {
      config: {
        provider: 'nodemailer',
        providerOptions: {
          host: env('SMTP_HOST'),
          port: env('SMTP_PORT'),
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
          pool: true,
          logger: true,
          debug: true,
          maxConnections: 10000
        },
        
        settings: {
          defaultFrom: env('DEFAULT_EMAIL'),
          defaultReplyTo: env('DEFAULT_EMAIL'),
        },
      },
    },
  });
