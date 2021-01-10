'use strict';

const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_Account.json')));
    for (let info of userData) {
      info.password = bcrypt.hashSync(info.password, salt);
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Users', userData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
