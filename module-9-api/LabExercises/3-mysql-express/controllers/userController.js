'use strict';
const { Users } = require('../models');
const bcrypt = require('bcrypt');

const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [
        {
          model: Users.sequelize.models.Posts,
          as: 'posts',
        },
        {
          model: Users.sequelize.models.Comments,
          as: 'comments',
        },
        {
          model: Users.sequelize.models.Likes,
          as: 'likes',
        },
      ],
    });
    res.status(200).json({ result: 200, data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password_hash, 10);

    const userData = {
      ...req.body,
      password_hash: hashedPassword,
    };

    const user = await Users.create(userData);

    const { password_hash, ...userResponse } = user.toJSON();

    res.status(200).json({ result: 200, data: userResponse });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ result: 404, error: 'User not found' });
    }
    await user.update(req.body);
    res.status(200).json({ result: 200, data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ result: 404, error: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ result: 200, data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

module.exports = {
  getUsers,
  createUser,
  deleteUser,
  updateUser,
};
