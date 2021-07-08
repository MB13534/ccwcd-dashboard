module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, REAL, DATE } = DataTypes;
  const MonthlyLaggedRecharge = sequelize.define(
    "rch_report_monthly_lagged_recharge",
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
      l_date: {
        type: DATE,
      },
      l_year: {
        type: INTEGER,
        primaryKey: true,
      },
      l_month: {
        type: INTEGER,
        primaryKey: true,
      },
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      lagged_value_af: {
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
      plan: {
        type: TEXT,
        primaryKey: true,
      }
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return MonthlyLaggedRecharge;
};
