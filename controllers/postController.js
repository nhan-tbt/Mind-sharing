var postController = {};
var models = require('../models/');
var Post = models.Post;
var User = models.User;
var Interaction = models.pInteraction
var Comment = models.pComment

postController.searchAllPost = function(callback){
	Post.findAll({
		// include: [{
		// 	model: User
		// },{
		// 	model: Interaction
		// },{
		// 	model: Comment
		// }]
		include: [{all: true}]
	}).then(function(posts) {
		callback(posts);
	});
};

postController.createPost = function(post) {
    Post.create(post);
};

module.exports = postController;