'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let ChatRoomData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_ChatRoom.json')));
    for (let info of ChatRoomData) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('ChatRooms', ChatRoomData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ChatRooms', null, {});
  }
};
