module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define(
    'Project',
    {
      project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      client_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lead_designer_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      project_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      project_type: {
        type: DataTypes.ENUM(
          'HDB',
          'Condominium',
          'Landed House',
          'Commercial'
        ),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          'Tender',
          'Design',
          'Construction',
          'Complete',
          'On Hold'
        ),
        defaultValue: 'Tender',
      },
      budget_estimate: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      target_completion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'projects',
      underscored: true,
      timestamps: true,
    }
  );

  Project.associate = function (models) {
    Project.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
    Project.hasMany(models.ProjectAssignment, {
      foreignKey: 'project_id',
      as: 'AssignedStaff',
    });
    Project.hasMany(models.Quotation, {
      foreignKey: 'project_id',
      as: 'quotations',
    });
    Project.hasMany(models.Invoice, {
      foreignKey: 'project_id',
      as: 'invoices',
    });
  };

  return Project;
};
