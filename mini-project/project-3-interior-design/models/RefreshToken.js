module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define(
    'RefreshToken',
    {
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'RefreshTokens',
      underscored: true,
      timestamps: true,
    }
  );

  RefreshToken.associate = function (models) {
    RefreshToken.belongsTo(models.Staff, {
      foreignKey: 'staff_id',
      as: 'staff',
    });
  };

  return RefreshToken;
};
