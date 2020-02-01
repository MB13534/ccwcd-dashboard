module.exports = (sequelize, DataTypes) => {
  const { STRING, INTEGER } = DataTypes;
  const MeasurementTypesView = sequelize.define(
    "list_measurement_types",
    {
      measure_type_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      measure_type_desc: {
        type: STRING,
      },
      sort_order: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return MeasurementTypesView;
};
