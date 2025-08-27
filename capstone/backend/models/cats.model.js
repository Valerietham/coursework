import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Cat extends Model {
    static associate(models) {
      Cat.belongsTo(models.Fosterer, {
        foreignKey: 'fosterer_id',
        as: 'fosterer',
      });
      Cat.hasMany(models.Interest, {
        foreignKey: 'cat_id',
        as: 'interests',
      });
    }
  }

  Cat.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      fosterer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'fosterers', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      gender: {
        type: DataTypes.ENUM('female', 'male', 'unknown'),
        allowNull: false,
      },
      age_in_months: { type: DataTypes.INTEGER, allowNull: true },
      breed: { type: DataTypes.STRING(255), allowNull: true },
      color: { type: DataTypes.STRING(255), allowNull: true },
      temperament: { type: DataTypes.STRING(255), allowNull: true },
      vaccinated: { type: DataTypes.BOOLEAN, allowNull: true },
      sterilized: { type: DataTypes.BOOLEAN, allowNull: true },
      dewormed: { type: DataTypes.BOOLEAN, allowNull: true },
      microchipped: { type: DataTypes.BOOLEAN, allowNull: true },
      photo_url: { type: DataTypes.TEXT, allowNull: true },
      description: { type: DataTypes.TEXT, allowNull: true },
      status: {
        type: DataTypes.ENUM('active', 'reserved', 'adopted', 'hidden'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'Cat',
      tableName: 'cats',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Cat;
};
