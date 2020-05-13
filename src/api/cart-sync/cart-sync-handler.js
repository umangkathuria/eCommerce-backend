'use strict';

/**
 * Import
*/
const dbUtils = require('../../db/dbUtils.js');

/**
 * This method handles all the requests received at /api/login. 
 * The purpose of the API s to validate a user login attempt. 
 * 
 * @param {Object} request Request object for handler
 * @param {Object} reply Reply object of server
 */
async function fetchCartSummary(request, reply) {

    let username = request.params.username;
    let cartId = request.params.cartId;
    console.log(`Request recieved to Get Cart with parameters - 
                Username : ${username} and products : ${cartId}`);
    let products = [];
    let query = `Select * from Users where username = '${username}'`
    let dbUserOj = await dbUtils.getSingleRow(query);
    // Checks if the path param contains the correct username
    if (dbUserOj) {
        let prodIds = await dbUtils.select(`Select prod_id from Carts where cart_id = '${cartId}'`);

        if( !prodIds || prodIds.length == 0 ){
            return reply.response({
                message: "Cart is either empty or invalid, please add products to cart and try agian."
            }).code(200);
        }
        for (let index = 0; index < prodIds.length; index++) {
            const id = prodIds[index];
            let sql = `Select * from Products where prod_id = '${id.prod_id}'`
            let row = await dbUtils.getSingleRow(sql);
            products.push(row);
        }

        return reply.response({
            cart_id: cartId,
            products: products
        }).code(200);
    } else {
        return reply.response({
            status: "Not found",
            message: "Username in url is not a valid username."
        }).code(404);
    }
}

module.exports.fetchCartSummary = fetchCartSummary;
