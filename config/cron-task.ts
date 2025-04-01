const marked = require('marked')

export const cronTask = {
  '* * * * *': async ({ strapi }) => {
    console.log('cron running2')
    try {
      let emails = await strapi.service('api::email-template.email-template').find()
      console.log('emails', emails);
      
      emails = emails.results.reverse()
      
      const subscribers = await strapi.service('api::mailing-list.mailing-list').find()
      console.log('subscribers', subscribers);
      
      // const content = marked.parse(emails[0].Content)

     const response:any = await Promise.all(subscribers.results.map(async (el, i) => {  
        return await strapi
        .plugin('email')
        .service('email')
        .send({
          to: el.Email,
          from: 'forte.test.only@gmail.com',
          subject: 'Test mail',
          text: 'This is a test email.', // Add this line
          html: `<p>testt</p>`,
        });
      }))
      console.log('response', response?.response?.data);
      
    } catch (error) {
      console.log('error',error?.response?.data);
      console.log('error ()',error?.response?.data?.details?.[0])

    }
}
}