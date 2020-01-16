module.exports = (sequelize, DataTypes) => {
  const AssocMeasurementTypesUnitsView = sequelize.define('view_assoc_types_measurements_units', {
    measure_type_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    unit_ndx: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    unit_name: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return AssocMeasurementTypesUnitsView;
};
