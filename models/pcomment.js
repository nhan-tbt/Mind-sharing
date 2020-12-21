'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pComment.init({
    contentCmt: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'pComment',
  });
  return pComment;
};