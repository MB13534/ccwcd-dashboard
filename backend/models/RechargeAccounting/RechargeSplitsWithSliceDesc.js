module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT } = DataTypes;
  const RechargeSplitsWithSliceDesc = sequelize.define(
    'rch_splits_with_slice_desc',
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
      r_year: {
        type: INTEGER,
        primaryKey: true,
      },
      r_month: {
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
      total_split: {
        type: REAL,
      },
      gms_af: {
        type: REAL,
      },
      was_af: {
        type: REAL,
      },
      ownr_af: {
        type: REAL,
      },
      dtch_af: {
        type: REAL,
      },
      total_af: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return RechargeSplitsWithSliceDesc;
};
