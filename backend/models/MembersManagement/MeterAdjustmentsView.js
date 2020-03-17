module.exports = (sequelize, DataTypes) => {
  const { BIGINT, INTEGER, REAL, TEXT, DATE } = DataTypes;
  const MeterAdjustmentsView = sequelize.define(
    "member_meterreadings_adjustments_view",
    {
      data_mradj_ndx: {
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      meter_index: {
        type: INTEGER,
      },
      meter_sn: {
        type: TEXT,
      },
      adjustment_date: {
        type: DATE,
      },
      adjustment_value: {
        type: REAL,
      },
      affected_readings: {
        type: TEXT,
      },
      unadjusted_change: {
        type: REAL,
      },
      adjusted_change: {
        type: REAL,
      },
      calculated_pumping_af: {
        type: REAL,
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
  return MeterAdjustmentsView;
};
