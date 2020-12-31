var controller = {};

const sequelize = require('sequelize');

var models = require('../models');
var User = models.User;
var Post = models.Post;
controller.searchAcc = function(account, callback){
	User.findOne({
		where: { id: account },
		raw: true
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



module.exports = controller;