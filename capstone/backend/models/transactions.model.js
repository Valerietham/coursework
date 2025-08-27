import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Adopter, {
        foreignKey: 'adopter_id',
        as: 'adopter',
      });
    }
  }

  Transaction.init(
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
        references: {
          model: 'adopters',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      kibbles_qty: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stripe_product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stripe_price_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount_sgd: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stripe_transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('pending', 'success', 'failed'),
        allowNull: false,
        defaultValue: 'pending',
      },
    },
    {
      sequelize,
      modelName: 'Transaction',
      tableName: 'transactions',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: false,
    }
  );

  return Transaction;
};
