'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let chatData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_Chat.json')));
    for (let info of chatData) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Chats', chatData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chats', null, {});
  }
};
