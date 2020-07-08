module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT } = DataTypes;
  const RechargeSplitsDefaultWithSliceDesc = sequelize.define(
    "rch_splits_defaults_with_slice_desc",
    {
      recharge_project_ndx: {
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
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
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
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return RechargeSplitsDefaultWithSliceDesc;
};
