import db from '../models/index.js';

export async function createFeed(adopterId, catId, kibblesUsed = 1) {
  try {
    // Validate that both adopter and cat exist
    const [adopter, cat] = await Promise.all([
      db.Adopter.findByPk(adopterId),
      db.Cat.findByPk(catId),
    ]);

    if (!adopter) {
      throw new Error('Adopter not found');
    }

    if (!cat) {
      throw new Error('Cat not found');
    }

    // Create the feed record
    const feed = await db.Feed.create({
      adopter_id: adopterId,
      cat_id: catId,
      kibbles_used: kibblesUsed,
      created_at: new Date(),
    });

    return feed;
  } catch (error) {
    console.error('Error creating feed record:', error);
    throw error;
  }
}

export async function getFeedsByAdopter(adopterId) {
  try {
    const feeds = await db.Feed.findAll({
      where: { adopter_id: adopterId },
      include: [
        {
          model: db.Cat,
          as: 'cat',
          attributes: ['id', 'name', 'photo_url', 'breed'],
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

    return feeds;
  } catch (error) {
    console.error('Error fetching feeds by adopter:', error);
    throw error;
  }
}

export async function getFeedsByCat(catId) {
  try {
    const feeds = await db.Feed.findAll({
      where: { cat_id: catId },
      include: [
        {
          model: db.Adopter,
          as: 'adopter',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    return feeds;
  } catch (error) {
    console.error('Error fetching feeds by cat:', error);
    throw error;
  }
}

export async function getFeedStats(adopterId) {
  try {
    const stats = await db.Feed.findAll({
      where: { adopter_id: adopterId },
      attributes: [
        'cat_id',
        [db.Feed.sequelize.fn('COUNT', db.Feed.sequelize.col('id')), 'feed_count'],
        [
          db.Feed.sequelize.fn('SUM', db.Feed.sequelize.col('kibbles_used')),
          'total_kibbles_used',
        ],
      ],
      include: [
        {
          model: db.Cat,
          as: 'cat',
          attributes: ['id', 'name', 'photo_url'],
          include: [
            {
              model: db.Fosterer,
              as: 'fosterer',
              attributes: ['id', 'name', 'contact_number', 'email'],
            },
          ],
        },
      ],
      group: ['cat_id', 'cat.id', 'cat.name', 'cat.photo_url'],
      order: [
        [db.Feed.sequelize.fn('COUNT', db.Feed.sequelize.col('id')), 'DESC'],
      ],
    });

    return stats;
  } catch (error) {
    console.error('Error fetching feed stats:', error);
    throw error;
  }
}
