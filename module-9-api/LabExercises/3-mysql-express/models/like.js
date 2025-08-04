module.exports = (sequelize, DataTypes) => {
  const Likes = sequelize.define(
    'Likes',
    {
      like_id: {
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
    },
    {
      tableName: 'likes',
      underscored: true,
      timestamps: true,
    }
  );

  Likes.associate = function (models) {
    Likes.belongsTo(models.Posts, {
      foreignKey: 'post_id',
      as: 'post',
    });
    Likes.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Likes;
};
