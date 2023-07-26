'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        defaultValue: 100.0
      }
    },
    {
      timestamps: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts')
  }
}
