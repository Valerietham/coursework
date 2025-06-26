'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const addDays = (date, days) =>
      new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

    const roles = [
      { role: 'Designer', staff: [1, 4] },
      { role: 'Project Manager', staff: [2, 5] },
      { role: 'Admin', staff: [3, 3] },
    ];

    const project_assignments = [];

    for (let i = 1; i <= 8; i++) {
      roles.forEach(({ role, staff }, idx) => {
        project_assignments.push({
          project_id: i,
          staff_id: staff[i % 2],
          role_in_project: role,
          assigned_date: addDays(now, 14),
          created_at: now,
          updated_at: now,
          is_deleted: false,
        });
      });
    }

    try {
      await queryInterface.bulkInsert(
        'project_assignments',
        project_assignments
      );
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('project_assignments', null, {});
  },
};
