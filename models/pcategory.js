'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Post.belongsTo(models.User);
      // Post.belongsTo(models.Post);
    }
  };
  pCategory.init({
    category: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'pCategory',
  });
  return pCategory;
};