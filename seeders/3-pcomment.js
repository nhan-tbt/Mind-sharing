'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let commentData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_Comment.json')));
    for (let info of commentData) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('pComments', commentData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pComments', null, {});
  }
};
