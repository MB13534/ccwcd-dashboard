module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER, ARRAY } = DataTypes;
  const MeasurementTypesView = sequelize.define(
    "atv_list_measurement_types",
    {
      measure_type_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      measure_type_desc: {
        type: STRING,
      },
      assoc_structure_ndx: {
        type: ARRAY(INTEGER),
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return MeasurementTypesView;
};
