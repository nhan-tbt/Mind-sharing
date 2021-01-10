'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messes', {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      }, 
      person1: {
        type: Sequelize.STRING
      },      
      person2: {
        type: Sequelize.STRING
      },
      who: {
        type: Sequelize.STRING
      },
      typeMess: {
        type: Sequelize.STRING
      },
      contentMess: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Messes');
  }
};