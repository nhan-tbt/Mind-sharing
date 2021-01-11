var pCommentController = {};
var models = require('../models/');
var Post = models.Post;
var User = models.User;
var Comment = models.pComment;
const sequelize = require('sequelize');

pCommentController.createComment = function(comment) {
    Comment.create(comment);
}

pCommentController.getCommentByPostId = function(PostId) {
    return new Promise((resolve, reject) => {
        Comment
        .findAll({
            where: {PostId: PostId},
            include: [User]
        })
        .then(comments => resolve(comments))
        .catch(error => reject(new Error(error)));
    });
}

module.exports = pCommentController;