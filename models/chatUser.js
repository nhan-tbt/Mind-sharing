'use strict';
const {
  Model
} = require('sequelize');
const post = require('./post');
module.exports = (sequelize, DataTypes) => {
  class ChatUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatUser.belongsTo(models.User);
      ChatUser.belongsTo(models.ChatRoom);
    }
  };
  ChatUser.init({
    ChatRoomId: DataTypes.INTEGER,
    UserId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ChatUser',
  });
  return ChatUser;
};