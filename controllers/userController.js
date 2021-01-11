var controller = {};

var models = require('../models');
var User = models.User;
var Post = models.Post;
const sequelize = require('sequelize');

controller.searchAcc = function(account, callback){
	User.findOne({
		where: { id: account },
	}).then(function(this_user) {
		callback(this_user);
	}).catch();
};

controller.searchUserWithKey = function(key, callback){
	User.findAll({
		where: {
			[sequelize.Op.or]: [
				{
					fname: {
						[sequelize.Op.iLike]: '%' + key + '%'
					}
				},
				{
					lname: {
						[sequelize.Op.iLike]: '%' + key + '%'
					}
				}
			]
		}
	}).then(function(users) {
		callback(users);
	});
};

controller.createAcc = function(user){
	User.create(user);
};

controller.update_pass = function (new_pass, account) {
	User
		.update({
			password: new_pass,
		}, {
			where: { id: account},
		}).catch();
};

controller.update_infor = function(new_infor, account) {
	User
	.update({
		fname: new_infor.fname,
		lname: new_infor.lname,
		email: new_infor.email,
		address: new_infor.address,
		pNum: new_infor.pNum,
		bDay: new_infor.bDay,
		bMonth: new_infor.bMonth,
		bYear: new_infor.bYear,
		gender: new_infor.gender,
		nation: new_infor.nation,
		bio: new_infor.bio
	}, {
		where: {id: account}
	}).catch();
}

module.exports = controller;