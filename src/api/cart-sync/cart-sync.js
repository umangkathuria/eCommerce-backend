'use strict';

/**
 * Import
 */
const Joi = require('@hapi/joi');
const handler = require('./cart-sync-handler.js');

module.exports.routes = [{
  method: 'GET',
  path: '/api/{username}/cart/{cartId}',
  config: {
    description: `This API endpoint fetches cart detail for a username`,
    cache: {
      otherwise: 'no-cache, no-store, must-revalidate',
    },
    auth: "jwt",
    validate: {
      params: Joi.object({
          username: Joi.string().min(3).required(),
          cartId: Joi.required()
      })
  }
  },
  handler: handler.fetchCartSummary,
}]

