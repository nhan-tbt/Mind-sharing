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
      //User.hasMany(models.Post);
    }
  };
  User.init({
    id: {
      type: DataTypes.TEXT,
      primaryKey: true
    },
    password: DataTypes.TEXT,
    type: DataTypes.TEXT,
    fname: DataTypes.TEXT,
    lname: DataTypes.TEXT,
    avtPath: DataTypes.TEXT,
    bgPath: DataTypes.TEXT,
    email: DataTypes.TEXT,
    pNum: DataTypes.TEXT,
    bDay: DataTypes.TEXT,
    bMonth: DataTypes.TEXT,
    bYear: DataTypes.TEXT,
    gender: DataTypes.TEXT,
    nation: DataTypes.TEXT,
    bio: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};