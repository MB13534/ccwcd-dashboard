module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, DATE, BOOLEAN } = DataTypes;
  const MeterAdjustmentsQAQCView = sequelize.define(
    "member_meterreadings_adjustments_view_forqaqc",
    {
      meter_index: {
        type: INTEGER,
      },
      meter_sn: {
        type: TEXT,
      },
      readings: {
        type: TEXT,
      },
      adjustment: {
        type: REAL,
      },
      change: {
        type: REAL,
      },
      last_reading_source: {
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
  return MeterAdjustmentsQAQCView;
};
