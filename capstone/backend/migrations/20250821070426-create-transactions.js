'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      adopter_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'adopters',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      kibbles_qty: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      stripe_product_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      stripe_price_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      amount_sgd: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      stripe_transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transactions');
  },
};
