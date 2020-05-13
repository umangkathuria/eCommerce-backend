'use strict';

/**
 * Import
 */
const dbUtil = require('../../db/dbUtils.js');

/**
 * This method handles all the requests received at /api/login. 
 * The purpose of the API s to validate a user login attempt. 
 * 
 * @param {Object} request Request object for handler
 * @param {Object} reply Reply object of server
 */
async function fetchAllProducts(request, reply) {
    // await dbUtil.prepareProductData();
    console.log(`Request recieved to fetch all products.`);
    try {
        let query = 'SELECT * FROM Products;'
        let result = await dbUtil.select(query);
        return reply.response({result}).code(200);
    } catch (err) {
        console.log("error", err);
        return reply.response({
            status: "Error Occurred", 
            message: "Internal Server Error", 
            err}).code(503);
    }
    
}


module.exports.fetchAllProducts = fetchAllProducts;
