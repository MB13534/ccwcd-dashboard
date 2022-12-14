module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL } = DataTypes;
  const RechargeSplits = sequelize.define(
    "data_recharge_splits",
    {
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
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return RechargeSplits;
};
