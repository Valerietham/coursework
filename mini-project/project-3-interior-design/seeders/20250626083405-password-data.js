'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    await queryInterface.sequelize.query(
      `UPDATE staff SET password = :password`,
      {
        replacements: { password: hashedPassword },
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`UPDATE staff SET password = NULL`);
  },
};
