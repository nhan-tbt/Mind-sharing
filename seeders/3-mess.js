'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let messData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_Mess.json')));
    for (let info of messData) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Messes', messData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messes', null, {});
  }
};
