module.exports = (sequelize, DataTypes) => {
  const { INTEGER, NUMERIC, DATE, ARRAY, TEXT } = DataTypes;
  const MeterReadings = sequelize.define(
    "historical_meter_readings_report",
    {
      well_index: {
        type: ARRAY(INTEGER),
      },
      meter_index: {
        type: INTEGER,
        primaryKey: true,
      },
      meter_sn: {
        type: TEXT,
      },
      collect_date: {
        type: DATE,
        primaryKey: true,
      },
      reading: {
        type: NUMERIC,
      },
      unit_desc: {
        type: TEXT,
      },
      correction_factor: {
        type: NUMERIC,
      },
      source: {
        type: TEXT,
      },
      wdids: {
        type: TEXT,
      },
      notes: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return MeterReadings;
};
