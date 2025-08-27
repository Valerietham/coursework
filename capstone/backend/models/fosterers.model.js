import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Fosterer extends Model {
    static associate(models) {
      Fosterer.hasMany(models.Cat, {
        foreignKey: 'fosterer_id',
        as: 'cats',
      });
    }
  }

  Fosterer.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      auth0_user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      contact_number: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      shelter_affiliation: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Fosterer',
      tableName: 'fosterers',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Fosterer;
};
