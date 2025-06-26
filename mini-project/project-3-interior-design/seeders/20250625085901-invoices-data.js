'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const addDays = (date, days) =>
      new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const invoice_statuses = ['Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'];

    const quotations = await queryInterface.sequelize.query(
      `SELECT quotation_id, project_id, total_amount, created_at
       FROM quotations 
       WHERE status = 'Approved';`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // Generate invoices based on approved quotations
    const invoices = quotations.map((q, i) => {
      const issue_date = addDays(new Date(q.created_at), 3);
      const due_date = addDays(issue_date, 30);

      return {
        quotation_id: q.quotation_id,
        project_id: q.project_id,
        invoice_number: `INV-${String(i + 1).padStart(3, '0')}`,
        status: getRandom(invoice_statuses),
        total_amount: Number(q.total_amount),
        issue_date,
        due_date,
        created_at: issue_date,
        updated_at: issue_date,
        is_deleted: false,
      };
    });

    try {
      await queryInterface.bulkInsert('invoices', invoices);
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('invoices', null, {});
  },
};
