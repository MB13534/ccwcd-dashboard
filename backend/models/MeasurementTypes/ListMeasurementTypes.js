module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListMeasurementTypes = sequelize.define(
    "list_measurement_types",
    {
      measure_type_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      measure_type_desc: {
        type: TEXT,
      },
      remark: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListMeasurementTypes;
};
