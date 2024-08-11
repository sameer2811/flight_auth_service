const bcrypt = require('bcrypt')

function checkPassword(userPassWord, userEncryptedPassword) {
    return bcrypt.compareSync(userPassWord, userEncryptedPassword);
}

function generateJsonWebToken() {

}

module.exports = {
    checkPassword
};