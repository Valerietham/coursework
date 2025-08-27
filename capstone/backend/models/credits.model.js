import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Credit extends Model {
    static associate(models) {
      Credit.belongsTo(models.Adopter, {
        foreignKey: 'adopter_id',
        as: 'adopter',
      });
    }
  }

  Credit.init(
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
      current_kibbles: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
      total_purchased: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: 'Credit',
      tableName: 'credits',
      timestamps: true,
    }
  );

  return Credit;
};
