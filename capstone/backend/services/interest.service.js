import db from '../models/index.js';

export async function getInterestsByAdopter(adopterId) {
  return await db.Interest.findAll({
    where: { adopter_id: adopterId },
    include: [
      {
        model: db.Cat,
        as: 'cat',
        attributes: [
          'id',
          'name',
          'photo_url',
          'breed',
          'age_in_months',
          'gender',
          'color',
          'temperament',
          'status',
        ],
        include: [
          {
            model: db.Fosterer,
            as: 'fosterer',
            attributes: ['id', 'name', 'contact_number', 'email'],
          },
        ],
      },
    ],
    order: [['created_at', 'DESC']],
  });
}

export async function getInterestsByAction(adopterId, action) {
  return await db.Interest.findAll({
    where: {
      adopter_id: adopterId,
      adopter_action: action,
    },
    include: [
      {
        model: db.Cat,
        as: 'cat',
        attributes: [
          'id',
          'name',
          'photo_url',
          'breed',
          'age_in_months',
          'gender',
          'color',
          'temperament',
          'status',
        ],
        include: [
          {
            model: db.Fosterer,
            as: 'fosterer',
            attributes: ['id', 'name', 'contact_number', 'email'],
          },
        ],
      },
    ],
    order: [['created_at', 'DESC']],
  });
}

export async function createInterest(adopterId, catId, action) {
  return await db.Interest.create({
    adopter_id: adopterId,
    cat_id: catId,
    adopter_action: action,
    created_at: new Date(),
  });
}

export async function updateInterest(adopterId, catId, action) {
  const [interest, created] = await db.Interest.findOrCreate({
    where: {
      adopter_id: adopterId,
      cat_id: catId,
    },
    defaults: {
      adopter_action: action,
      created_at: new Date(),
    },
  });

  if (!created) {
    await interest.update({
      adopter_action: action,
      created_at: new Date(),
    });
  }

  return interest;
}
