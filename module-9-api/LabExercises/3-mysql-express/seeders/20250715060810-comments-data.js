'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'comments',
      [
        {
          user_id: 2,
          post_id: 1,
          content: 'Relational Databases are fun!',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_id: 1,
          post_id: 2,
          content:
            'Thanks for sharing this. The examples are clear and easy to follow.',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('comments', null, {});
  },
};
