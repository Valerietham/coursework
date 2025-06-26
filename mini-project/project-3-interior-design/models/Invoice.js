module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    'Invoice',
    {
      invoice_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      quotation_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      invoice_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      status: {
        type: DataTypes.ENUM('Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled'),
        defaultValue: 'Draft',
      },
      issue_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      due_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'invoices',
      underscored: true,
      timestamps: true,
    }
  );

  Invoice.associate = function (models) {
    Invoice.belongsTo(models.Quotation, {
      foreignKey: 'quotation_id',
      as: 'quotation',
    });
    Invoice.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
    });
  };
  return Invoice;
};
