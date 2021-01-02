'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Messes', [{
      id: "2020/12/31/11/59/58",
      ChatId: 1,
      who: 'admin',
      typeMess: 'TEXT',
      contentMess: 'Merry Chrishmas And Happy New Year!',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }, {
      id: "2020/12/31/11/59/59",
      ChatId: 1,
      who: 'user_1',
      typeMess: 'TEXT',
      contentMess: 'Okay!',
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Messes', null, {});
  }
};
