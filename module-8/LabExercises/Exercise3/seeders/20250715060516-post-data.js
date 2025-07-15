'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('posts', [
      {
        user_id: 1,
        title: 'Module 8 - Databases',
        description:
          'Learn how to store, retrieve, and manage data using databases. This module covers relational databases, key SQL commands, data modeling, and how to structure data efficiently for use in modern applications.',
        header_image_url:
          'https://assets.intersystems.com/dims4/default/24e2cfd/2147483647/strip/true/crop/6400x4800+0+0/resize/1290x968!/quality/90/?url=http%3A%2F%2Finter-systems-brightspot.s3.amazonaws.com%2F30%2F16%2Fdf3b816e4e5bb30ad654bb9ae160%2Fgettyimages-157334670.jpg',
        is_published: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        title: 'Module 9 - API',
        description:
          'Discover how apps communicate through APIs. Learn to design, call, and work with RESTful APIs, handle JSON data, and connect frontend to backend services, essential skills for building dynamic, real-world applications.',
        header_image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNdyNzXlqItoepGhQ58c87z0M0j9uyrm28Kw&s',
        is_published: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
