'use strict';

/**
 * Import
 */
const Joi = require('@hapi/joi');
const handler = require('./login-handler.js');

module.exports.routes = [{
  method: 'POST',
  path: '/api/login',
  config: {
    description: `This API endpoint performs user validation and 
                  generates a valid JWT Token on successful Login`,
    cache: {
      otherwise: 'no-cache, no-store, must-revalidate',
    },
    validate: {
      payload: Joi.object({
        username: Joi.string().min(3).required(),
        password: Joi.string().min(6).required()
      })
    }
  },

  handler: handler.authenticateUser,
}]

