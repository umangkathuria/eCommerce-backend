'use strict';

/**
 * Import
 */
const jwt = require('jsonwebtoken');
const secret = "secret";
const dbUtils = require('../db/dbUtils.js');

/**
 * Use this method to generate JWT Token for validation purposes for a user.
 * 
 * @param {Object} user Contains the user object for which JWT Token is to be created.
 */
function createToken(user) {
  // Sign the JWT
  return jwt.sign( { id: user._id, username: user.usernames },
                   secret, { algorithm: 'HS256', expiresIn: "1h" } );
}

/**
 * Use this middleware for authenticating a token received with the request. 
 * 
 * @param {Object} decoded Deceoded oject from JWT Authentication
 * @param {Oject} request Request object 
 * @param {Object} h reply object containg response structure
 */
const validateToken = async function (decoded, request, h) {
  let users = await dbUtils.select("Select * from Users;");
  let flag = false;
  // checks to see if the user is using valid JWT token
  users.forEach(element => {
    if (element._id == decoded.id) {
      flag = true;
    }
  });
  return { isValid: flag }
};

/**
 * Exports
 */
module.exports.createToken = createToken;
module.exports.validateToken = validateToken;