module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    'Client',
    {
      client_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      tableName: 'clients',
      underscored: true,
      timestamps: true,
    }
  );
  Client.associate = function (models) {
    Client.hasMany(models.Project, {
      foreignKey: 'client_id',
      as: 'projects',
    });
  };

  return Client;
};
