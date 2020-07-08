module.exports = (sequelize, DataTypes) => {
  const { REAL, TEXT, INTEGER } = DataTypes;
  const ListSlicesQAQCTimeSteps = sequelize.define(
    "rch_list_slices_qaqc_timesteps",
    {
      ac: {
        type: TEXT,
      },
      urf_chk: {
        type: TEXT,
      },
      spt_def_chk: {
        type: TEXT,
      },
      spt_tot_chk: {
        type: TEXT,
      },
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
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
      r_year: {
        type: INTEGER,
      },
      r_month: {
        type: INTEGER,
      },
      recharge_value_af: {
        type: REAL,
      },
      gms: {
        type: REAL,
      },
      was: {
        type: REAL,
      },
      ownr: {
        type: REAL,
      },
      dtch: {
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
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ListSlicesQAQCTimeSteps;
};
