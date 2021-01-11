'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let path = require('path');
    let fs = require('fs');
    let interactionData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../JSON/seeder_Interaction.json')));
    for (let info of interactionData) {
      info.createdAt = Sequelize.literal('NOW()');
      info.updatedAt = Sequelize.literal('NOW()');
    }
    return queryInterface.bulkInsert('pInteractions', interactionData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('pInteractions', null, {});
  }
};
