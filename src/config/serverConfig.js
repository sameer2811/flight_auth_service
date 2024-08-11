const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    PORT: process.env.PORT,
    HASH_SALT: parseInt(process.env.HASH_SALT),
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};