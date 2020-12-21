'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      type:{
        type: Sequelize.TEXT
      },
      fname: {
        type: Sequelize.TEXT
      },
      lname: {
        type: Sequelize.TEXT
      },
      avtPath: {
        type: Sequelize.TEXT
      },
      bgPath: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      pNum: {
        type: Sequelize.TEXT
      },
      bDay: {
        type: Sequelize.TEXT
      },
      bMonth: {
        type: Sequelize.TEXT
      },
      bYear: {
        type: Sequelize.TEXT
      },
      gender: {
        type: Sequelize.TEXT
      },
      nation: {
        type: Sequelize.TEXT
      },
      bio: {
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
    await queryInterface.dropTable('Users');
  }
};