var controller = {};

const sequelize = require('sequelize');
var models = require('../models');

var ChatRoom = models.ChatRoom;
var ChatUser = models.ChatUser;
var Mess = models.Mess;
var User = models.User;


controller.searchChatRoom = function(account, callback){
	ChatRoom.findOne({
		where: { 	UserId: account 	},
	}).then(function(chatroom) {
		callback(chatroom);
	});
};

controller.searchChatUser = function(id, callback){
	ChatUser.findAll({
		where: {	ChatRoomId: id		},
		include: [User]
	}).then(function(chatusers) {
		callback(chatusers);
	});
};

controller.searchMess = function(person1, person2, callback){
	Mess.findAll({
		where: {
			[sequelize.Op.or]: [
				{
					person1: person1,
					person2: person2
				},
				{
					person1: person2,
					person2: person1
				}
			]
		}
	}).then(function(messes) {
		callback(messes);
	});
};

controller.createMess = function(mess) {
	Mess.create(mess)
}

controller.createChatRoom = function(account, callback) {
	ChatRoom.create({	 
		UserId: account	
	}).then(function(chatroom) {
		callback(chatroom);
	});
}

controller.checkChatUser = function(RoomId, account, callback){
	ChatUser.findOne({
		where: {
			ChatRoomId: RoomId,
			UserId: account
		}
	}).then(function(user) {
		callback(user);
	});
}

controller.createChatUser = function(ele) {
	ChatUser.create(ele);
}

module.exports = controller;