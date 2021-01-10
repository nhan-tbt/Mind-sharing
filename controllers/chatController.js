var controller = {};

var models = require('../models');
var User = models.User;
var Chat = models.Chat;
var Mess = models.Mess;

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