module.exports = (sequelize, DataTypes) => {
  const AssocMeasurementTypesUnitsLanding = sequelize.define('landing_assoc_types_measurements_units', {
    measure_type_ndx: {
      type: DataTypes.INTEGER,
    },
    measure_type_name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      trim: true,
    },
    unit_ndx: {
      type: DataTypes.STRING,
      allowNull: false,      
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return AssocMeasurementTypesUnitsLanding;
};
