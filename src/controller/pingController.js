const { StatusCodes } = require("http-status-codes");

async function handlePingController(req, res, next) {
    return res.status(StatusCodes.OK).json({
        "msg": "HELLO WORLD"
    });
}

module.exports = handlePingController;