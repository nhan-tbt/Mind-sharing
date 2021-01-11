var postController = {};
var pInteractionController = require('./pInteractionController');
var models = require('../models/');
var Post = models.Post;
var User = models.User;
var Interaction = models.pInteraction;
var Comment = models.pComment;

postController.searchAllPost = function(user, callback){
	Post.findAll({
		include: [{
			model: User,
		},{
			model: Interaction
		},{
			model: Comment
		}],
		include: [{all: true}]
	}).then(function(posts) {
		callback(posts);
	});
};

postController.createPost = function(post) {
    Post.create(post);
};

postController.seachPostById = function(PostId) {
	return new Promise ((resolve, reject) => {
		Post
		.findOne({
			where: {id: PostId}
		}).then(post => resolve (post))
		.catch(error => reject (new Error(error)));
	})
}

postController.likePost = function(post) {
	Post
	.update(
		{like: post.like}, 
		{where: {id: post.id}}
	)
	.catch();
}

postController.unlikePost = function(post) {
	Post
	.update(
		{like: post.like}, 
		{where: {id: post.id}}
	)
	.catch();
}

postController.checkInteractionByUser = function(user) {
	return new Promise ((resolve, reject) => {
		Interaction
		.findAll({
			where: {UserId: user.id}
		})
		.then(inter => resolve(inter))
		.catch(error => reject (new Error(error)));
	})
}

module.exports = postController;