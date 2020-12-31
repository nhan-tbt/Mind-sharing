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
      type: DataTypes.TEXT,
      primaryKey: true
    },
    ChatId: DataTypes.INTEGER,
    UserID: DataTypes.STRING,
    contentMess: DataTypes.TEXT,
    time: DataTypes.STRING,
    mDay: DataTypes.INTEGER,
    mMonth: DataTypes.INTEGER,
    mYear: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Mess',
  });
  return Mess;
};