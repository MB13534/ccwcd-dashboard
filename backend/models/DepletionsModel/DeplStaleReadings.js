module.exports = (sequelize, DataTypes) => {
  const { INTEGER, DATE, TEXT } = DataTypes;
  const StaleReadings = sequelize.define(
    "pump_05_stale_readings",
    {
      i_year: {
        type: INTEGER,
        primaryKey: true,
      },
      i_month: {
        primaryKey: true,
        type: INTEGER,
      },
      well_index: {
        primaryKey: true,
        type: INTEGER,
      },
      wdid: {
        type: TEXT,
      },
      contracts: {
        type: TEXT,
      },
      meters: {
        type: TEXT,
      },
      last_reading_date: {
        type: DATE,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return StaleReadings;
};
