module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: 'users',
      underscored: true,
      timestamps: true,
    }
  );

  Users.associate = function (models) {
    Users.hasMany(models.Posts, {
      foreignKey: 'user_id',
      as: 'posts',
    });
    Users.hasMany(models.Comments, {
      foreignKey: 'user_id',
      as: 'comments',
    });
    Users.hasMany(models.Likes, {
      foreignKey: 'user_id',
      as: 'likes',
    });
  };

  return Users;
};
