'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let ChatUserData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_ChatUser.json')));
    for (let info of ChatUserData) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('ChatUsers', ChatUserData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChatUsers', null, {});
  }
};
