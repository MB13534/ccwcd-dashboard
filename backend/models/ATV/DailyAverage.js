module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, DATE, STRING } = DataTypes;
  const DailyAverage = sequelize.define(
    "atv_data_daily_average",
    {
      station_name: {
        type: STRING,
        primaryKey: true,
      },
      collect_timestamp: {
        type: DATE,
        primaryKey: true,
      },
      avg_daily_value: {
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
  return DailyAverage;
};
