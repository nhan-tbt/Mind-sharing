var pCommentController = {};
var models = require('../models/');
var Post = models.Post;
var User = models.User;
var Comment = models.pComment;
const sequelize = require('sequelize');

pCommentController.createComment = function(comment) {
    return new Promise((resolve, reject) => {
        Comment.create(comment)
        .then(comment => resolve(comment))
        .catch(error => reject(new Error(error)));
    })
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

pCommentController.deleteComment = function(commentID) {
    Comment.destroy({
        where: {id: commentID}
    })
}

module.exports = pCommentController;