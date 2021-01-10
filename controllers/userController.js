var controller = {};

var models = require('../models');
var User = models.User;
var Post = models.Post;

controller.searchAcc = function(account, callback){
	User.findOne({
		where: { id: account },
	}).then(function(this_user) {
		callback(this_user);
	});
};

controller.createAcc = function(user){
	User.create(user);
};

controller.searchAllPost = function(callback){
	Post.findAll({
		include: [User],
	}).then(function(posts) {
		callback(posts);
	});
};

controller.update_pass = function (new_pass, account) {
	models.User
		.update({
			password: new_pass,
		}, {
			where: { id: account},
		}).catch();
};

module.exports = controller;