module.exports = (sequelize, DataTypes) => {
  const Staff = sequelize.define(
    'Staff',
    {
      staff_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM('Designer', 'Project Manager', 'Admin'),
        allowNull: false,
      },
      hire_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: 'staff',
      underscored: true,
      timestamps: true,
    }
  );

  Staff.associate = function (models) {
    Staff.hasMany(models.ProjectAssignment, {
      foreignKey: 'staff_id',
      as: 'projectAssignments',
    });
    Staff.hasMany(models.Quotation, {
      foreignKey: 'created_by',
      as: 'quotationsCreated',
    });
    Staff.hasMany(models.RefreshToken, {
      foreignKey: 'staff_id',
      as: 'tokens',
    });
  };
  return Staff;
};
