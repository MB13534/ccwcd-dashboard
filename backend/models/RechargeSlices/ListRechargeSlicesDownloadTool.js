module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, REAL } = DataTypes;
  const ListRechargeSlicesDownloadTool = sequelize.define(
    "rch_list_slices_with_plan_download_tool",
    {
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recharge_slice_desc: {
        type: TEXT,
      },
      recharge_project_desc: {
        type: TEXT,
      },
      structure_desc: {
        type: TEXT,
      },
      recharge_decree_desc: {
        type: TEXT,
      },
      gms_reach: {
        type: TEXT,
      },
      was_reach: {
        type: TEXT,
      },
      current_yr_af: {
        type: REAL,
      },
      historical_af: {
        type: REAL,
      },
      recharge_project_ndx: {
        type: INTEGER,
      },
      structure_ndx: {
        type: INTEGER,
      },
      recharge_decree_ndx: {
        type: INTEGER,
      },
      plan: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ListRechargeSlicesDownloadTool;
};
