module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, DATE, STRING, BIGINT } = DataTypes;
  const LastReport = sequelize.define(
    "atv_data_last_report",
    {
      station_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      station_name: {
        type: STRING,
      },
      por_start: {
        type: DATE,
      },
      por_end: {
        type: DATE,
      },
      recordcount: {
        type: BIGINT,
      },
      last_value_received: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return LastReport;
};
