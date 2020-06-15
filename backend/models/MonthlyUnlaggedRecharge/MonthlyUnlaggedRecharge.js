module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, REAL, DATE } = DataTypes;
  const MonthlyUnlaggedRecharge = sequelize.define(
    "rch_report_monthly_unlagged_recharge",
    {
      recharge_project_ndx: {
        type: INTEGER,
      },
      recharge_decree_ndx: {
        type: INTEGER,
      },
      structure_ndx: {
        type: INTEGER,
      },
      r_date: {
        type: DATE,
      },
      r_year: {
        type: INTEGER,
        primaryKey: true,
      },
      r_month: {
        type: INTEGER,
        primaryKey: true,
      },
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      recharge_value_af: {
        type: REAL,
      },
      recharge_project_desc: {
        type: TEXT,
      },
      recharge_decree_desc: {
        type: TEXT,
      },
      structure_desc: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return MonthlyUnlaggedRecharge;
};
