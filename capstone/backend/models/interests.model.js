import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Interest extends Model {
    static associate(models) {
      Interest.belongsTo(models.Adopter, {
        foreignKey: 'adopter_id',
        as: 'adopter',
      });
      Interest.belongsTo(models.Cat, {
        foreignKey: 'cat_id',
        as: 'cat',
      });
    }
  }

  Interest.init(
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
        references: { model: 'adopters', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      cat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'cats', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      adopter_action: {
        type: DataTypes.ENUM('like', 'pass'),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'Interest',
      tableName: 'interests',
      underscored: true,
      timestamps: false,
      created_at: 'created_at',
    }
  );

  return Interest;
};
