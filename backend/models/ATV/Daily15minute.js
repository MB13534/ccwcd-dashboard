module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, DATE, STRING } = DataTypes;
  const Daily15Minute = sequelize.define(
    "atv_data_15minute",
    {
      station_name: {
        type: STRING,
        primaryKey: true,
      },
      collect_timestamp: {
        type: DATE,
        primaryKey: true,
      },
      measured_value: {
        type: REAL,
      },
      structure_ndx: {
        type: INTEGER,
      },
      measure_type_ndx: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return Daily15Minute;
};
