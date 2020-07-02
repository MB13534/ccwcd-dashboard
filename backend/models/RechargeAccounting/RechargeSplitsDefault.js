module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL } = DataTypes;
  const RechargeSplitsDefault = sequelize.define(
    "data_recharge_splits_defaults",
    {
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
      schema: "data",
      freezeTableName: true,
    }
  );
  return RechargeSplitsDefault;
};
