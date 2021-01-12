'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let reportedData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_ReportedPost.json')));
    for (let info of reportedData) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('ReportedPosts', reportedData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ReportedPosts', null, {});
  }
};
