'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReportedPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ReportedPost.belongsTo(models.Post);
      ReportedPost.belongsTo(models.User);
    }
  };
  ReportedPost.init({
    PostId: DataTypes.INTEGER,
    UserId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReportedPost',
  });
  return ReportedPost;
};