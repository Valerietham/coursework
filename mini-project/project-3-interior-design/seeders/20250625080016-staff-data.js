'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const roles = ['Designer', 'Project Manager', 'Admin'];
    const names = ['Valerie', 'Joel', 'Cynthia', 'Jessica', 'Binbin'];

    const staff = names.map((name, i) => ({
      name,
      email: `${name.toLowerCase()}@design.com`,
      role: roles[i % roles.length],
      hire_date: now,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));

    try {
      await queryInterface.bulkInsert('staff', staff);
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('staff', null, {});
  },
};
