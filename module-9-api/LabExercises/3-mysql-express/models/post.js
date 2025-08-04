module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define(
    'Posts',
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      header_image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_published: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'posts',
      underscored: true,
      timestamps: true,
    }
  );

  Posts.associate = function (models) {
    Posts.hasMany(models.Comments, {
      foreignKey: 'post_id',
      as: 'comments',
    });
    Posts.hasMany(models.Likes, {
      foreignKey: 'post_id',
      as: 'likes',
    });
    Posts.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Posts;
};
