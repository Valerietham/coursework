module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    'Comments',
    {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'comments',
      underscored: true,
      timestamps: true,
    }
  );

  Comments.associate = function (models) {
    Comments.belongsTo(models.Posts, {
      foreignKey: 'post_id',
      as: 'post',
    });
    Comments.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Comments;
};
