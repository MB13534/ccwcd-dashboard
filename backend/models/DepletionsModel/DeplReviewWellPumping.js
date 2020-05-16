module.exports = (sequelize, DataTypes) => {
  const { REAL, DATE, INTEGER, TEXT } = DataTypes;
  const ReviewPumpingByWell = sequelize.define(
    "pump_02_meterreadings_summary_well_assoc",
    {
      well_chk: {
        type: TEXT,
      },
      meter_sn: {
        type: TEXT,
        primaryKey: true,
      },
      op_year: {
        type: INTEGER,
        primaryKey: true,
      },
      ytd_af: {
        type: REAL,
      },
      first_read_date: {
        type: DATE,
      },
      last_read_date: {
        type: DATE,
      },
      readings_count: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ReviewPumpingByWell;
};
