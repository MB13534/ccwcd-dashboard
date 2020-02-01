module.exports = (sequelize, DataTypes) => {
    const { STRING, INTEGER } = DataTypes;
    const MeasurementStationsView = sequelize.define(
      "list_measurement_stations_dmview",
      {
        station_ndx: {
          type: INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        station_name: {
          type: STRING,
        },
        measure_type_desc: {
          type: STRING,
        },
        unit_desc: {
        type: STRING,
        },
        display_name_short: {
        type: STRING,
        },
        source_desc: {
        type: STRING,
        },
        display_order: {
        type: INTEGER,
        },
        remark: {
        type: STRING,
    },
      },
      {
        timestamps: false,
        schema: "data",
        freezeTableName: true,
      }
    );
    return MeasurementStationsView;
  };