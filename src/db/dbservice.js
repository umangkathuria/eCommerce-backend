'use strict';

/**
 * Import
 */
const sqlite3 = require('sqlite3').verbose();
const schema =  require('./schema.js');
const dbSchema = schema.dbSchema;
const prodSchema = schema.productsSchema;
const cartSchema = schema.cartSchema;
let db;

/**
 * Initialisng DB
 */
function initialiseDB(){
    db = new sqlite3.Database('./data/ecommerce.db', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connected to the SQlite database.');
       
      });
    
    db.run(dbSchema, (err)=>{
        if(err){
            console.log("Error creating schema.")
            return console.err(err);
        }
    });
    
    db.run(prodSchema, (err)=>{
        if(err){
            console.log("Error creating schema.")
            return console.error(err);
        }
    })

    db.run(cartSchema, (err)=>{
        if(err){
            console.log("Error creating schema.")
            return console.error(err);
        }
    })
}

initialiseDB();

/**
 * Method to return existing instance of DB.
 */
function getDBInstance(){ 
    if(!db){
        db = initialiseDB()
    }
    return db;
}

module.exports.getDBInstance = getDBInstance;

