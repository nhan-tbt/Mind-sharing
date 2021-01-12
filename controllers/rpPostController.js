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

controller.createReported = function(userid, postid){
	rpPost.create({	
		UserId: userid,
		PostId: postid
	})
}

module.exports = controller;