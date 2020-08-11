module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, NUMERIC } = DataTypes;
  const RechargeLaggedQAQC = sequelize.define(
    "rch_lagged_qaqc",
    {
      recharge_slice_ndx: { type: INTEGER, primaryKey: true },
      recharge_project_desc: { type: TEXT },
      structure_desc: { type: TEXT },
      recharge_decree_desc: { type: TEXT },
      r_year: { type: INTEGER, primaryKey: true },
      r_month: { type: INTEGER, primaryKey: true },
      need_to_lag: { type: NUMERIC },
      lagged_af: { type: NUMERIC },
      unlagged_af: { type: NUMERIC },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return RechargeLaggedQAQC;
};
