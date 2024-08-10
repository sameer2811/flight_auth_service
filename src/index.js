const express = require('express');
const serverConfig = require('./config/serverConfig');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const appServer = express();

// Setting up the body Parsers
appServer.use(bodyParser.json());
appServer.use(bodyParser.text());
appServer.use(bodyParser.urlencoded({
    extended: true
}));

appServer.use('/api', apiRouter);
// Definition of  the Server here
async function startServer() {
    appServer.listen(serverConfig.PORT, async function () {
        console.log(`Server has started on PORT : ${serverConfig.PORT}`);
    });
}

// Starting the server
startServer();