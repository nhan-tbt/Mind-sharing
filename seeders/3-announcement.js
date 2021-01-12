'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let commentAnnou = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_Announcement.json')));
    for (let info of commentAnnou) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Announcements', commentAnnou);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Announcements', null, {});
  }
};
