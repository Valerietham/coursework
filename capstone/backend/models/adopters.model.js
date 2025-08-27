import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Adopter extends Model {
    static associate(models) {
      Adopter.hasMany(models.Interest, {
        foreignKey: 'adopter_id',
        as: 'interests',
      });
    }
  }

  Adopter.init(
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
      picture_url: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      home_type: {
        type: DataTypes.ENUM('HDB', 'Condo', 'Landed Property'),
        allowNull: true,
      },
      first_time_owner: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      has_pets: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'Adopter',
      tableName: 'adopters',
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Adopter;
};
