'use strict';

/**
 * Import
 */
const dbUtils = require('../../db/dbUtils.js')


/**
 * This method handles all the requests received at /api/login. 
 * The purpose of the API s to validate a user login attempt. 
 * 
 * @param {Object} request Request object for handler
 * @param {Object} reply Reply object of server
 */
async function addToCart(request, reply) {
    let products = request.payload;
    let username = request.params.username;
    console.log(`Request recievd to Add Product to Cart with parameters - 
                Username : ${username} and products : ${JSON.stringify(products)}`);

    let query = `Select * from Users where username = '${username}'`;
    let dbUserOj = await dbUtils.getSingleRow(query);
    // Checks if the path param contains the correct username
    if (dbUserOj) {
        let current_cart_id = await dbUtils.getCurrentActiveCart(username);
        if (current_cart_id == -1 || current_cart_id == null) {

            // Get last cart ID and do an increment to create a new ID
            let lastCartIdQuery = `SELECT MAX(cart_id) FROM Carts;`
            let cartId = await dbUtils.getSingleRow(lastCartIdQuery);
            cartId = cartId["MAX(cart_id)"];
            if (cartId > 0) {
                cartId = cartId + 1;
            } else {
                cartId = 1;
            }
            try {
                // Add a new row to the cart table 
                let rowsInserted = await dbUtils.insertProductsToCart(products, cartId);
                if (rowsInserted) {
                    // Set new cart id in Users table
                    let updatedRows = await updateUser(username, cartId);
                    if (updatedRows) {
                        // Response set to 201 
                        return reply.response({
                            status: `${rowsInserted} products Added`,
                            cart_id: cartId,
                            products: products
                        }).code(201);
                    }
                }
            } catch (err) {
                console.log(err);
                return reply.response({
                    status: "Products could not be added.",
                    error: err
                }).code(502);
            }
        } else {
            // Add a new row to the cart table using old cart ID
            let rowsInserted = await dbUtils.insertProductsToCart(products, current_cart_id);
            if (rowsInserted) {
                return reply.response({
                    status: "Products Added",
                    cart_id: current_cart_id,
                    products: products
                }).code(201);
            }
        }
    }
}

function updateUser(username, cartId) {
    
	let query= `UPDATE Users SET cart_id = '${cartId}' WHERE username = '${username}'`;
    return new Promise((resolve, reject) => {
        dbUtils.update(query).then((result) => {
            resolve(result);
        }).catch((err)=>{
            reject(err);
        })
    })

}
module.exports.addToCart = addToCart;
