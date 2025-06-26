module.exports = (sequelize, DataTypes) => {
  const Catalog = sequelize.define(
    'Catalog',
    {
      catalog_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      item_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      item_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      supplier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      cost_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      markup_percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
      selling_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      uom: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'catalog',
      underscored: true,
      timestamps: true,
    }
  );

  Catalog.associate = function (models) {
    Catalog.hasMany(models.QuotationItem, {
      foreignKey: 'catalog_id',
      as: 'quotationItems',
    });
  };

  return Catalog;
};
