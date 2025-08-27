import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Feed extends Model {
    static associate(models) {
      Feed.belongsTo(models.Adopter, {
        foreignKey: 'adopter_id',
        as: 'adopter',
      });

      Feed.belongsTo(models.Cat, {
        foreignKey: 'cat_id',
        as: 'cat',
      });
    }
  }

  Feed.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      adopter_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      kibbles_used: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Feed',
      tableName: 'feeds',
      timestamps: false,
    }
  );

  return Feed;
};
