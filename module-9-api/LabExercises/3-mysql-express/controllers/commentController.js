const { Comments, Users, Posts } = require('../models');

const createComment = async (req, res) => {
  try {
    const { user_id, post_id, content } = req.body;

    const newComment = await Comments.create({
      user_id,
      post_id,
      content,
    });

    const commentWithUser = await Comments.findByPk(newComment.comment_id, {
      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['user_id', 'username', 'first_name', 'last_name'],
        },
      ],
    });

    res.status(201).json({
      result: 201,
      data: commentWithUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const { comment_id } = req.params;
    const { content } = req.body;

    const [updatedRows] = await Comments.update(
      { content },
      { where: { comment_id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({
        result: 404,
        error: 'Comment not found',
      });
    }

    const updatedComment = await Comments.findByPk(comment_id, {
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
      data: updatedComment,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { post_id } = req.params;

    const comments = await Comments.findAll({
      where: { post_id },
      include: [
        {
          model: Users,
          as: 'user',
          attributes: ['user_id', 'username', 'first_name', 'last_name'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    res.status(200).json({
      result: 200,
      data: comments,
      count: comments.length,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { comment_id } = req.params;

    const deletedRows = await Comments.destroy({
      where: { comment_id },
    });

    if (deletedRows === 0) {
      return res.status(404).json({
        result: 404,
        error: 'Comment not found',
      });
    }

    res.status(200).json({
      result: 200,
      message: 'Comment deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 500, error: err.message });
  }
};

module.exports = {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment,
};
