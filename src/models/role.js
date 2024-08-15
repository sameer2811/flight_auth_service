'use strict';
const {
  Model
} = require('sequelize');
const USER_ROLE_ENUM = require('../utils/common/enums');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        through: 'User_Roles',
      });
    }
  }
  Role.init({
    name: {
      type: DataTypes.ENUM,
      values: [USER_ROLE_ENUM.ADMIN, USER_ROLE_ENUM.CUSTOMER, USER_ROLE_ENUM.FLIGHT_COMPANY],
      defaultValue: USER_ROLE_ENUM.CUSTOMER,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};