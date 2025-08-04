const { Likes, Users, Posts } = require('../models');

const toggleLike = async (req, res) => {
  try {
    const { user_id, post_id } = req.body;
    const existingLike = await Likes.findOne({
      where: { user_id, post_id },
    });

    if (existingLike) {
      await existingLike.destroy();
      res.status(200).json({
        result: 200,
        message: 'Post unliked successfully',
        action: 'unliked',
      });
    } else {
      const like = await Likes.create({ user_id, post_id });
      res.status(201).json({
        result: 201,
        data: like,
        message: 'Post liked successfully',
        action: 'liked',
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const getLikesByPost = async (req, res) => {
  try {
    const { post_id } = req.params;

    const likes = await Likes.findAll({
      where: { post_id },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['user_id', 'username', 'first_name', 'last_name'],
        },
      ],
    });

    res.status(200).json({
      result: 200,
      data: likes,
      count: likes.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const getLikesByUser = async (req, res) => {
  try {
    const { user_id } = req.params;

    const likes = await Likes.findAll({
      where: { user_id },
      include: [
        {
          model: Posts,
          as: 'post',
          attributes: ['post_id', 'title', 'description'],
        },
      ],
    });

    res.status(200).json({
      result: 200,
      data: likes,
      count: likes.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

module.exports = {
  toggleLike,
  getLikesByPost,
  getLikesByUser,
};
