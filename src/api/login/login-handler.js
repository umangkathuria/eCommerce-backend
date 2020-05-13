'use strict';

/**
 * Import
 */
const tokenUtils = require('../../util/token')
const db = require('../../db/dbservice').getDBInstance();
const dbUtils = require('../../db/dbUtils.js');

/**
 * This method handles all the requests received at /api/login. 
 * The purpose of the API s to validate a user login attempt. 
 * 
 * @param {Object} request Request object for handler
 * @param {Object} reply Reply object of server
 */
async function authenticateUser(request, reply) {
    // dbUtils.prepareUserData().then(()=>{})

    let user = request.payload;
    console.log(`Request received for login.`)
    let query = `Select * from Users where username = '${user.username}'`
    try {
        let dbUserOj = await dbUtils.getSingleRow(query);
        if (dbUserOj && dbUserOj.password == user.password) {
            let jwtToken = tokenUtils.createToken(dbUserOj);
            return reply.response({
                status: "Ok",
                token: jwtToken
            }).code(200);
        } else {
            return reply.response({
                status: "Bad Request",
                message: "Invalid Username or password."
            }).code(400);
        }
    } catch (err) {
        return reply.response({
            status: "Request failed.",
            message: "Unexpected error occured. "
        }).code(502);
    }

}

module.exports.authenticateUser = authenticateUser;
