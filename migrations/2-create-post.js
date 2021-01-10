'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.STRING,
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      time: {
        type: Sequelize.STRING
      },
      pDay: {
        type: Sequelize.INTEGER
      },
      pMonth: {
        type: Sequelize.INTEGER
      },
      pYear: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      imgPath: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      category: {
        type: Sequelize.STRING
      },
      like: {
        type: Sequelize.INTEGER
      },
      comment: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Posts');
  }
};