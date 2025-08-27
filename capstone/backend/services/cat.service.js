import db from '../models/index.js';

export async function getAllCats() {
  return await db.Cat.findAll({
    where: {
      status: 'active'
    },
    include: [
      {
        model: db.Fosterer,
        as: 'fosterer',
        attributes: ['id', 'name', 'contact_number', 'email'],
      },
    ],
    order: db.Sequelize.literal('RAND()')
  });
}

export async function getCatById(id) {
  return await db.Cat.findByPk(id, {
    include: [
      {
        model: db.Fosterer,
        as: 'fosterer',
        attributes: ['id', 'name', 'contact_number', 'email'],
      },
    ],
  });
}

export async function createCat(data) {
  return await db.Cat.create(data);
}
