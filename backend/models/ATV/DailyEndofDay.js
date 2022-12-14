module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, DATE, STRING } = DataTypes;
  const DailyEndofDay = sequelize.define(
    "atv_data_daily_endofday",
    {
      station_name: {
        type: STRING,
        primaryKey: true,
      },
      collect_timestamp: {
        type: DATE,
        primaryKey: true,
      },
      endofday_value: {
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
  return DailyEndofDay;
};
