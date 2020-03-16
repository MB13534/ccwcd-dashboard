module.exports = (sequelize, DataTypes) => {
  const { BIGINT, INTEGER, REAL, TEXT, DATE, BOOLEAN } = DataTypes;
  const MeterAdjustmentsLanding = sequelize.define(
    "data_member_meterreadings_adjustments",
    {
      data_mradj_ndx: {
        type: BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      meter_index: {
        type: INTEGER,
      },
      adjustment_date: {
        type: DATE,
      },
      adjustment_value: {
        type: REAL,
      },
      remark: {
        type: TEXT,
      },
      invalid: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return MeterAdjustmentsLanding;
};
