'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'likes',
      [
        {
          user_id: 2,
          post_id: 1,
          created_at: new Date(),
        },
        {
          user_id: 1,
          post_id: 2,
          created_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('likes', null, {});
  },
};
