'use strict';

const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      id: 'admin',
      password: bcrypt.hashSync('admin123', salt),
      type: 'ADMIN',
      fname: 'Admin',
      lname: '',
      avtPath: "../images/avt_admin.png",
      bgPath: "../images/bg_admin.jpg",
      email: "MindSharingWeb2k@gmail.com",
      pNum: "0969327639",
      bDay: "1",
      bMonth: "1",
      bYear: "2000",
      gender: "Male",
      nation: "VietNam",
      bio: "Nothing",
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
