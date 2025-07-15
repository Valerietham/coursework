'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password12345', 10);

    await queryInterface.bulkInsert('users', [
      {
        username: 'valerietham',
        email: 'valerietham@gmail.com',
        password_hash: hashedPassword,
        first_name: 'Valerie',
        last_name: 'Tham',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'raydenbb',
        email: 'raydenbb@gmail.com',
        password_hash: hashedPassword,
        first_name: 'Rayden',
        last_name: 'Tham',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
