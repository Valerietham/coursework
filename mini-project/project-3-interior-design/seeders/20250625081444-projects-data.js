'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const addDays = (date, days) =>
      new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

    const start_date = addDays(now, 14);
    const target_completion = addDays(now, 90);

    const types = ['HDB', 'Condominium', 'Landed House', 'Commercial'];
    const projectNames = [
      'Modern Minimalist',
      'The Serene Loft',
      'Luxury Mansion',
      'The Clubhouse',
      'The Urban Retreat',
      'Scandi Sanctuary',
      'Rustic Chic Bungalow',
      'Juz1 Shopping Mall',
      'The Humble Oasis',
      'Coastal Breeze Residence',
    ];
    const status = ['Tender', 'Design', 'Construction', 'Complete', 'On Hold'];
    const projects = Array.from({ length: 10 }, (_, i) => ({
      client_id: (i % 10) + 1,
      project_name: projectNames[i % projectNames.length],
      description: `Interior Build for Project ${i + 1}`,
      project_address: `${i + 1} Orchard Road`,
      project_type: types[i % types.length],
      status: status[i % status.length],
      budget_estimate: 80000 + i * 5000,
      start_date,
      target_completion,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));

    try {
      await queryInterface.bulkInsert('projects', projects);
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('projects', null, {});
  },
};
