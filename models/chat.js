'use strict';
const {
  Model
} = require('sequelize');
const post = require('./post');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chat.belongsTo(models.User);
      Chat.hasMany(models.Mess);
    }
  };
  Chat.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    UserIdOwn: DataTypes.STRING,
    UserIDFriend: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};