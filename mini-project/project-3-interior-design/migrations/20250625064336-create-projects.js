'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      project_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      client_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'clients',
          key: 'client_id',
        },
        onUpdate: 'CASCADE',
      },
      project_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      project_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      project_type: {
        type: Sequelize.ENUM(
          'HDB',
          'Condominium',
          'Landed House',
          'Commercial'
        ),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM(
          'Tender',
          'Design',
          'Construction',
          'Complete',
          'On Hold'
        ),
        allowNull: false,
        defaultValue: 'Tender',
      },
      budget_estimate: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      target_completion: {
        type: Sequelize.DATEONLY,
        allowNull: true,
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
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projects');
  },
};
