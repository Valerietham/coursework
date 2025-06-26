'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const names = [
      'Alice Tan',
      'Benjamin Lee',
      'Cheryl Ong',
      'Daniel Goh',
      'Emily Lim',
      'Felix Teo',
      'Grace Wong',
      'Hannah Chua',
      'Ivan Tan',
      'Jolene Ng',
    ];

    const now = new Date();

    const clients = names.map((name, index) => {
      const phone =
        '9' + Math.floor(10000000 + Math.random() * 9000000).toString();
      const email = `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`;

      return {
        name,
        phone,
        email,
        created_at: now,
        updated_at: now,
        is_deleted: false,
      };
    });

    try {
      await queryInterface.bulkInsert('clients', clients);
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clients', null, {});
  },
};
