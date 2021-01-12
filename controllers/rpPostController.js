var controller = {};

const models = require('../models');
const rpPost = models.ReportedPost;
const Post = models.Post;
const User = models.User;

controller.searchAllRpPost = function(callback){
	rpPost.findAll({
		include: [{
			model: Post,
		},{
			model: User
		}]
	})
	.then(function(rpPosts) {
		callback(rpPosts);
	});
};

controller.createReported = function(report, callback){
	rpPost.create({	report	})
}

module.exports = controller;