var controller = {};

const sequelize = require('sequelize');

var models = require('../models');
var User = models.User;
var Post = models.Post;
var Chat = models.Chat;
var Mess = models.Mess;

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

controller.searchChat = function(account, callback){
	Chat.findAll({
		where: { Owner: account },
		include: [User],
	}).then(function(chats) {
		callback(chats);
	});
};

controller.searchMess = function(id, callback){
	Mess.findAll({
		where: { ChatId: id },
		raw: true
	}).then(function(messes) {
		callback(messes);
	});
};

controller.createMess = function(mess){
	Mess.create(mess);
}

module.exports = controller;