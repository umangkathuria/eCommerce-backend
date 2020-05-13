/**
 * Imports
 */
const fs = require('fs');
const Hapi = require('@hapi/hapi');
let apiServer;
let isServerRunning = false;
require('dotenv').config();
const validate = require('./src/util/token').validateToken;

/**
 * Use this method to start the server 
 */
async function startServer() {
    // Get base folder, based on the node_modules folder this code executes at
    var baseDir = process.cwd();
    var pathToApiDir = baseDir + '/src/api/';
    var apiAvailable = [];
    let routes = [];

    let files = fs.readdirSync(pathToApiDir)

    // Server configuration
    const server = Hapi.server({
        port: process.env.SERVER_PORT,
        host: process.env.SERVER_HOST
    });
   
    // Register authentication mechanism
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt',
        {
            key: process.env.AUTH_KEY, // secret key to be kept in 
            validate  // validate function
        });

    // Dynamically fetch all the routes
    files.forEach((api) => {
        var apiFolder = pathToApiDir + api;
        let package = JSON.parse(fs.readFileSync(`${apiFolder}/package.json`));
        let mainFile = package.main;
        let fileRoute = require(`${apiFolder}/${mainFile}`).routes;
        routes = routes.concat(fileRoute);
    })

    // Register all the routes to server
    routes.forEach((route) => {
        server.route(route);
    })

    // Start the server
    server.start().then(() => {
        console.log("Server Initiated..");
        apiServer = server
    }).catch((err) => {
        console.log("Server failed to start due to - ", err);
    })
}

/**
 * Getter method for currently running server instance
 */
function getServerInstance() {
    if (isServerRunning) {
        return server;
    } else {
        let routes = startServer();
        if (routes) {
            return server
        } else {
            return null;
        }
    }

}

module.exports.getServerInstance = getServerInstance;
module.exports.startServer = startServer;