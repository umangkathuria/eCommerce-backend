module.exports.dbSchema = `
CREATE TABLE IF NOT EXISTS Users (
    id integer NOT NULL PRIMARY KEY,
    username text NOT NULL UNIQUE,
    password text NOT NULL,
    cart_id integer
    );`

module.exports.cartSchema = `CREATE TABLE IF NOT EXISTS Carts (
    cart_id integer NOT NULL,
    prod_id integer NOT NULL,
    cart_status text NOT NULL,
    PRIMARY KEY( cart_id, prod_id)
    );`

module.exports.productsSchema = `CREATE TABLE IF NOT EXISTS Products (
    prod_id integer PRIMARY KEY,
    name text NOT NULL, 
    description text NOT NULL, 
    price REAL NOT NULL, 
    make INTEGER NOT NULL
    );`

