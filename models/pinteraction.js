'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pInteraction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  pInteraction.init({
    like: DataTypes.BOOLEAN,
    share: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'pInteraction',
  });
  return pInteraction;
};