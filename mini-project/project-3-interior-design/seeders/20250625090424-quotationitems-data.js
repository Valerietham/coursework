'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const getRandomQty = () => Math.floor(Math.random() * 5 + 1); // Make random qty from 1–5
    const rooms = ['Kitchen', 'Living Room', 'Bedroom', 'Bathroom'];

    // 1. Fetch Catalog items
    const catalogItems = await queryInterface.sequelize.query(
      `SELECT catalog_id, item_name, selling_price FROM catalog WHERE is_deleted = false;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    // 2. Fetch quotations
    const quotations = await queryInterface.sequelize.query(
      `SELECT quotation_id FROM quotations WHERE is_deleted = false LIMIT 40;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    if (catalogItems.length === 0 || quotations.length === 0) {
      console.warn(
        'No catalog or quotations available for quotation items seeding.'
      );
      return;
    }

    // 3. Generate quotation_items
    const quotation_items = Array.from({ length: 250 }, () => {
      const catalog = getRandom(catalogItems);
      const quotation = getRandom(quotations);
      const quantity = getRandomQty();
      const unit_price = parseFloat(catalog.selling_price);
      const line_total = parseFloat((quantity * unit_price).toFixed(2));

      return {
        quotation_id: quotation.quotation_id,
        catalog_id: catalog.catalog_id,
        description: catalog.item_name,
        quantity,
        unit_price,
        line_total,
        room_location: getRandom(rooms),
        created_at: now,
        updated_at: now,
        is_deleted: false,
      };
    });

    try {
      await queryInterface.bulkInsert('quotation_items', quotation_items);
    } catch (error) {
      console.error('Seeding error:', error);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('quotation_items', null, {});
  },
};
