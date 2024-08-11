'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt');
const serverConfig = require('../config/serverConfig');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave(function encryptPassword(user) {
    console.log("coming here 1");
    user.password = bcrypt.hashSync(user.password, serverConfig.HASH_SALT);
  })
  return User;
};