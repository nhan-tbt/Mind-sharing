var controller = {};

const sequelize = require('sequelize');

var models = require('../models');
var User = models.User;

controller.searchAcc = function(account, callback){
	User.findOne({
		where: { id: account },
		raw: true
	}).then(function(this_user) {
		callback(this_user);
	});
};

controller.createAcc = function(user){
	models.User
	.create(user);
};

// controller.updatea = function(){
// 	models.User
// 	.update({
// 		type: 'USER',
// 	}, {
// 		where: {id: 'tainhan2013'},
// 	}
// 	);
// };


module.exports = controller;