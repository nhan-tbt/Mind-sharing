var postController = {};
var models = require('../models/');
var Post = models.Post;
var User = models.User;

postController.searchAllPost = function(callback){
	Post.findAll({
		include: [User],
	}).then(function(posts) {
		callback(posts);
	});
};

postController.createPost = function(post) {
    Post.create(post);
};

module.exports = postController;