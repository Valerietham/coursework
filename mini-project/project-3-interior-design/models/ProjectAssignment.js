module.exports = (sequelize, DataTypes) => {
  const ProjectAssignment = sequelize.define(
    'ProjectAssignment',
    {
      assignment_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      staff_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role_in_project: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      assignment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: 'project_assignments',
      underscored: true,
      timestamps: true,
    }
  );

  ProjectAssignment.associate = function (models) {
    ProjectAssignment.belongsTo(models.Project, {
      foreignKey: 'project_id',
      as: 'project',
    });
    ProjectAssignment.belongsTo(models.Staff, {
      foreignKey: 'staff_id',
      as: 'staff',
    });
  };
  return ProjectAssignment;
};
