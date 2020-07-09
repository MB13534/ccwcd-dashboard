module.exports = (sequelize, DataTypes) => {
  const { INTEGER, DATE, REAL } = DataTypes;
  const UrfsData = sequelize.define(
    "rch_urfs_data",
    {
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      timestep: {
        type: INTEGER,
        primaryKey: true,
      },
      urf_value: {
        type: REAL,
      },
      last_updated: {
        type: DATE,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return UrfsData;
};
