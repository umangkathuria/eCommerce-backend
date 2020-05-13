'use strict';

/**
 * Import
 */
const db = require('./dbservice').getDBInstance();


/**
 * Use this method to get all data from table against a query.
 * 
 * @param {String} query Queyr containing the select query
 */
function select(query) {
    return new Promise((resolve, _) => {
        db.all(query, [], (err, rows) => {
            if (err) {
                throw err;
            }
            resolve(rows);
        });
    })
}


/**
 * Use this method for performing an UPDATE operation on the 
 * table using query in parameter. 
 * 
 * @param {String} query Query for updating
 */
function update(query) {
    return new Promise((resolve, reject) => {
        db.run(query, [], function (err) {
            if (err) {
                console.log("Error while updating table - ", err);
                return reject(err)
            }
            console.log(`Row(s) updated: ${this.changes}`);
            return resolve(this.changes)
        });
    })
}
/**
 * Use this method to fetch single row from the query. 
 * 
 * @param {String} query Query for fetching the data
 */
function getSingleRow(query) {
    return new Promise((resolve, _) => {
        db.get(query, [], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return resolve(row);

        })
    })
}

/**
 * Use this method to fetch the active cart ID for a user using username. 
 * @param {string} username Contains the username for which active cart is to be fetched.
 */
function getCurrentActiveCart(username) {
    return new Promise((resolve, reject) => {
        let query = `Select * from Users where username = '${username}'`
        getSingleRow(query)
            .then((user) => {
                return resolve(user.cart_id);
            }).catch((err) => {
                return reject(err);
            })
    })
}

/**
 * 
 * @param {*} products 
 * @param {*} cartId 
 */
function insertProductsToCart(products, cartId) {
    return new Promise((resolve, reject) => {
        let placeholders = products.map((_) => '(?, ?, ?)').join(',');
        let sql = 'INSERT INTO Carts(cart_id, prod_id, cart_status) VALUES ' + placeholders;

        let flatArr = [];
        products.forEach((prod) => {
            flatArr.push(cartId);
            flatArr.push(prod.prod_id);
            flatArr.push("active");
        });

        db.run(sql, flatArr, function (err) {
            if (err) {
                console.error(err.message)
                return reject(err);
            }
            return resolve(this.changes);
        });
    })

}

module.exports.insertProductsToCart = insertProductsToCart;
module.exports.getCurrentActiveCart = getCurrentActiveCart;
module.exports.select = select;
module.exports.update = update;
module.exports.getSingleRow = getSingleRow;
