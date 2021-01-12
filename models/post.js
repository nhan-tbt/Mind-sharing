'use strict';


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User);
      Post.hasMany(models.pComment);
      Post.hasMany(models.pInteraction);
      Post.hasMany(models.Announcement);
    }
  };
  Post.init({
    UserId: DataTypes.STRING,
    time: DataTypes.STRING,
    pDay: DataTypes.TEXT,
    pMonth: DataTypes.TEXT,
    pYear: DataTypes.TEXT,
    content: DataTypes.TEXT,
    imgPath: DataTypes.ARRAY(DataTypes.STRING),
    category: DataTypes.STRING,
    like: DataTypes.INTEGER,
    comment: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};