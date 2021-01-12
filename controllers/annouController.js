var controller = {};

const models = require('../models');
const Announcement = models.Announcement;
const Post = models.Post;
const User = models.User;

controller.searchAllAnnoun = function(callback){
	Announcement.findAll({
		include: [{
			model: Post,
		},{
			model: User
		}]
		
	})
	.then(function(annou) {
		callback(annou);
	});
};


controller.createAnnou = function(ele) {
	Announcement.create(ele);
}

module.exports = controller;