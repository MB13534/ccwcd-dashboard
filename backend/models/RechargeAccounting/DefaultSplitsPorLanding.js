module.exports = (sequelize, DataTypes) => {
  const { INTEGER } = DataTypes;
  const DefaultSplitsPorLanding = sequelize.define(
    "rch_edit_default_splits_por_landing",
    {
      sel_year: {
        type: INTEGER,
      },
      sel_month: {
        type: INTEGER,
      },
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return DefaultSplitsPorLanding;
};
