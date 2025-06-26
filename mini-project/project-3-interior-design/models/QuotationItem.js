module.exports = (sequelize, DataTypes) => {
  const QuotationItem = sequelize.define(
    'QuotationItem',
    {
      item_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      quotation_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      catalog_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 1,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      line_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      room_location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'quotation_items',
      underscored: true,
      timestamps: true,
    }
  );

  QuotationItem.associate = function (models) {
    QuotationItem.belongsTo(models.Quotation, {
      foreignKey: 'quotation_id',
      as: 'quotation',
    });
    QuotationItem.belongsTo(models.Catalog, {
      foreignKey: 'catalog_id',
      as: 'catalog',
    });
  };
  return QuotationItem;
};
