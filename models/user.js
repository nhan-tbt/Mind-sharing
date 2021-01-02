'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post);
      User.hasMany(models.Chat);
    }
  };
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    password: DataTypes.STRING,
    type: DataTypes.STRING,
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    email: DataTypes.STRING,
    pNum: DataTypes.STRING,
    bDay: DataTypes.INTEGER,
    bMonth: DataTypes.INTEGER,
    bYear: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    nation: DataTypes.STRING,
    bio: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};