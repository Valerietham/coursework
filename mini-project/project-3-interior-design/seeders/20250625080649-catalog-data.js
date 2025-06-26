'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const categories = ['Flooring', 'Lighting', 'Furniture'];
    const suppliers = ['LuxeLiving', 'DesignHaus', 'UrbanCore'];
    const units = ['sqft', 'ea', 'mm'];
    const itemNames = [
      'Oak Wood Plank',
      'Marble Tile',
      'Vinyl Sheet',
      'Track Light',
      'Pendant Lamp',
      'Wall Sconce',
      'Dining Table',
      'Sofa Set',
      'Coffee Table',
      'TV Console',
      'Accent Chair',
      'Laminate Flooring',
      'LED Downlight',
      'Floor Lamp',
      'Wood Paneling',
      'Textured Paint',
      'Wallpaper Roll',
      'Ceiling Fan',
      'Storage Bench',
      'Bar Stool',
    ];

    const markupOptions = [30, 35, 40, 45, 50];

    const catalog = Array.from({ length: 20 }, (_, i) => {
      const item_name = itemNames[i % itemNames.length];
      const cost_price = Math.floor(Math.random() * 25 + 6) * 5;
      const markup_percentage = getRandom(markupOptions);
      const selling_price = parseFloat(
        (cost_price * (1 + markup_percentage / 100)).toFixed(2)
      );

      return {
        item_code: `item${String(i + 1).padStart(3, '0')}`,
        item_name,
        category: getRandom(categories),
        supplier: getRandom(suppliers),
        cost_price,
        markup_percentage,
        selling_price,
        unit_of_measure: getRandom(units),
        created_at: now,
        updated_at: now,
        is_deleted: false,
      };
    });

    try {
      await queryInterface.bulkInsert('catalog', catalog);
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('catalog', null, {});
  },
};
