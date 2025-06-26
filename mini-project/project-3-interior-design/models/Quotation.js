module.exports = (sequelize, DataTypes) => {
  const Quotation = sequelize.define(
    'Quotation',
    {
      quotation_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.STRING, // references staff_id
        allowNull: false,
      },
      quotation_no: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      status: {
        type: DataTypes.ENUM(
          'Draft',
          'Sent',
          'Approved',
          'Rejected',
          'Expired'
        ),
        defaultValue: 'Draft',
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      valid_until: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'quotations',
      underscored: true,
      timestamps: true,
    }
  );
  Quotation.associate = function (models) {
    Quotation.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
    });
    Quotation.belongsTo(models.Staff, {
      foreignKey: 'created_by',
      as: 'createdBy',
    });
    Quotation.hasOne(models.Invoice, {
      foreignKey: 'quotation_id',
      as: 'invoice',
    });
    Quotation.hasMany(models.QuotationItem, {
      foreignKey: 'quotation_id',
      as: 'quotationItems',
    });
  };

  return Quotation;
};
