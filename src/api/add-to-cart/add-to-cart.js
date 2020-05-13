'use strict';

/**
 * Import
 */
const Joi = require('@hapi/joi');
const handler = require('./add-to-cart-handler.js');

module.exports.routes = [{
  method: 'POST',
  path: '/api/{username}/addToCart',
  config: {
    description: `This API is used for adding products to cart.`,
    cache: {
      otherwise: 'no-cache, no-store, must-revalidate',
    },
    auth: 'jwt',
    validate: {
      params: Joi.object({
        username: Joi.string().min(3)
      }),
      payload: Joi.array().items(Joi.object().keys({
        prod_id: Joi.number().integer().required()
      }))
    }
  },

  handler: handler.addToCart,
}]

