// /**
//  *  article controller
//  */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::article.article');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::article.article', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params; // 'id' will actually hold the slug now
    const contentType = strapi.contentTypes['api::article.article'];
    const allFields = Object.keys(contentType.attributes);

    // Prepare the populate object
    const populateOptions = {};
    allFields.forEach(field => {
      const fieldType = contentType.attributes[field].type;
      if (['relation', 'media', 'component', 'dynamiczone'].includes(fieldType)) {
        populateOptions[field] = true;
      }
    });
    const entity = await strapi.db.query('api::article.article').findOne({
      where: { slug: id },
      populate: populateOptions, // Adjust based on your needs
    });

    if (!entity) {
      return ctx.notFound('Article not found');
    }

    return entity;
  },
}));
