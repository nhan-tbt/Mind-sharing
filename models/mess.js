'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mess.belongsTo(models.Chat);
    }
  };
  Mess.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    ChatId: DataTypes.INTEGER,
    who: DataTypes.STRING,
    typeMess: DataTypes.STRING,
    contentMess: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Mess',
  });
  return Mess;
};