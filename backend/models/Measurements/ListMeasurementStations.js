module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, BOOLEAN } = DataTypes;
  const ListMeasurementStations = sequelize.define(
    "list_measurement_stations",
    {
      station_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      station_name: {
        type: TEXT,
      },
      measure_type_ndx: {
        type: INTEGER,
      },
      unit_ndx: {
        type: INTEGER
      },
      display_name_short: {
        type: TEXT,
      },
      source_ndx: {
        type: INTEGER,
      },
      display_order: {
        type: INTEGER,
      },
      inactive: {
        type: BOOLEAN,
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
  return ListMeasurementStations;
};
