'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cats', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      fosterer_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'fosterers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      gender: {
        type: Sequelize.ENUM('female', 'male', 'unknown'),
        allowNull: false,
      },
      age_in_months: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      breed: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      temperament: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      vaccinated: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      sterilized: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      dewormed: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      microchipped: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
      photo_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('active', 'reserved', 'adopted', 'hidden'),
        allowNull: false,
        defaultValue: 'active',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
        ),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cats');
  },
};
