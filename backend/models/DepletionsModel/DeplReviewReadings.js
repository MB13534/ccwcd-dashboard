module.exports = (sequelize, DataTypes) => {
  const { DATE, NUMERIC, INTEGER, TEXT } = DataTypes;
  const DeplReviewReadings = sequelize.define(
    "pump_01_meterreadings_review",
    {
      created: {
        type: DATE,
      },
      meter_sn: {
        type: TEXT,
        primaryKey: true,
      },
      collect_timestamp: {
        type: DATE,
        primaryKey: true,
      },
      reading: {
        type: NUMERIC,
      },
      unit_desc: {
        type: TEXT,
      },
      raw_change: {
        type: NUMERIC,
      },
      adjustment: {
        type: REAL,
      },
      correction_factor: {
        type: REAL,
      },
      final_pumping_af: {
        type: REAL,
      },
      last_source: {
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
  return DeplReviewReadings;
};
