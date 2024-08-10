const express = require('express');
const serverConfig = require('./config/serverConfig');
const appServer = express();


// Definition of  the Server here
async function startServer() {
    appServer.listen(serverConfig.PORT, async function () {
        console.log(`Server has started on PORT : ${serverConfig.PORT}`);
    });
}

// Starting the server
startServer();