'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let postData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_Post.json')));
    for (let info of postData) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('Posts', postData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
