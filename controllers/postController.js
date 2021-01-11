var postController = {};
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
			model: Interation,
			where: {UserId: user.id}
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
	return new Promise ((resolve, reject) => {
		Post
		.update(
			{like: post.like + 1}, 
			{where: {id: post.id}}
		)
		.then(post => resolve(post))
		.catch(error => reject (new Error(error)));
	})
}

postController.unlikePost = function(post) {
	return new Promise ((resolve, reject) => {
		Post
		.update(
			{like: post.like - 1}, 
			{where: {id: post.id}}
		)
		.then(post => resolve(post))
		.catch(error => reject (new Error(error)));
	})
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