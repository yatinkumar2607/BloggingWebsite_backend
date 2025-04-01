// /**
//  *  category controller
//  */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::category.category');
// /**
//  *  article controller
//  */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreController('api::article.article');

const createCoreControllertest = require('@strapi/strapi').factories;

module.exports = createCoreControllertest.createCoreController('api::category.category', ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params; // 'id' will actually hold the slug now
    const entity = await strapi.db.query('api::category.category').findOne({
      where: { slug: id },
      populate: ['image', 'author'], // Adjust based on your needs
    });

    if (!entity) {
      return ctx.notFound('Article not found');
    }

    return entity;
  },
}));
