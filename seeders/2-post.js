'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      UserId: 'admin',
      time: '20:44',
      pDay: '29',
      pMonth: '12',
      pYear: '2020',
      content: 'Welcome to MindSharing - where we can find or share knowledge with each other. Merry christmas and happy new year!\nLove',
      imgPath: [""],
      like: 0,
      share: 0,
      comment: 0,
      category: ["announ"],
      createdAt: Sequelize.literal('NOW()'),
      updatedAt: Sequelize.literal('NOW()')
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  }
};
