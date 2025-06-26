'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const addDays = (date, days) =>
      new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const statusPool = [
      'Draft',
      'Sent',
      'Sent',
      'Approved',
      'Approved',
      'Approved',
      'Rejected',
      'Expired',
    ];

    let quotations = [];
    let quotationCount = 1;

    for (let projectId = 1; projectId <= 20; projectId++) {
      const numberOfQuotations = Math.floor(Math.random() * 3) + 1;

      for (let version = 1; version <= numberOfQuotations; version++) {
        const amount = Math.floor(Math.random() * 80000) + 5000;
        const createdBy = 3;
        const createdAt = addDays(now, -Math.floor(Math.random() * 30));

        quotations.push({
          project_id: projectId,
          created_by: createdBy,
          quotation_number: `Q-${String(quotationCount).padStart(3, '0')}`,
          version,
          status: getRandom(statusPool),
          total_amount: amount.toFixed(2),
          valid_until: addDays(createdAt, 14),
          created_at: createdAt,
          updated_at: createdAt,
          is_deleted: false,
        });

        quotationCount++;
      }
    }

    try {
      await queryInterface.bulkInsert('quotations', quotations);
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quotations', null, {});
  },
};
