var postController = {};
var models = require('../models/');
var Post = models.Post;
var User = models.User;
var Interaction = models.pInteraction;
const sequelize = require('sequelize');

postController.searchAllPost = function(callback){
	Post.findAll({
		include: [{
			model: User,
		},{
			model: Interaction
		}]
	}).then(function(posts) {
		callback(posts);
	});
};

postController.searchUserPost = function(userid, callback){
	Post.findAll({
		where: { UserId: userid },
		include: [{
			model: User,
		},{
			model: Interaction
		}]
	}).then(function(posts) {
		callback(posts);
	});
};

postController.searchCatePost = function(cate, callback){
	Post.findAll({
		where: {
			category: cate
		},
		include: [{
			model: User,
		},{
			model: Interaction
		}]
	}).then(function(posts) {
		callback(posts);
	});
};

postController.searchPostWithSearch = function(key, callback){
	Post.findAll({
		where: {
			[sequelize.Op.or]: [
				{
					UserId: {
						[sequelize.Op.iLike]: '%' + key + '%'
					}
				},
				{
					category: {
						[sequelize.Op.iLike]: '%' + key + '%'
					}
				},
				{
					content: {
						[sequelize.Op.iLike]: '%' + key + '%'
					}
				}
			]
		},
		include: [{
			model: User,
		},{
			model: Interaction
		}]
	}).then(function(posts) {
		callback(posts);
	});
};

postController.searchPostWithId = function(id, callback){
	Post.findAll({
		where: {
			id: id
		},
		include: [{
			model: User,
		},{
			model: Interaction
		}]
	}).then(function(posts) {
		callback(posts);
	});
};

postController.createPost = function(post, callback) {
	Post.create(post)
			.then(function(annou) {
				callback(annou);
			});
}

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

postController.cmtPost = function(post) {
	Post
	.update(
		{comment: post.comment}, 
		{where: {id: post.id}}
	)
	.catch();
}

// postController.addComment = function() {

// }

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