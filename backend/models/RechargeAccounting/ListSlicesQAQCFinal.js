module.exports = (sequelize, DataTypes) => {
  const { REAL, TEXT, INTEGER } = DataTypes;
  const ListSlicesQAQCFinal = sequelize.define(
    "rch_list_slices_qaqc_final",
    {
      ac: {
        type: TEXT,
      },
      urf_chk: {
        type: TEXT,
      },
      spt_chk: {
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
      por_af: {
        type: REAL,
      },
      por2y_af: {
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
      urf_af_total: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ListSlicesQAQCFinal;
};
