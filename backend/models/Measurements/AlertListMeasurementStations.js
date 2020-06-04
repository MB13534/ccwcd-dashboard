module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const AlertListMeasurementStations = sequelize.define(
    "alert_list_measurement_stations",
    {
      station_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      station_name: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return AlertListMeasurementStations;
};
