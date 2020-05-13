'use strict';

/**
 * Import
 */
const handler = require('./product-details-handler.js');

module.exports.routes = [{
  method: 'GET',
  path: '/api/prod',
  config: {
    description: `This API handles all requests for fetching all the products.`,
    cache: {
      otherwise: 'no-cache, no-store, must-revalidate',
    },
  },
  handler: handler.fetchAllProducts,
}]

