module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, BOOLEAN } = DataTypes;
  const ListRechargeSlicesWithoutDefaultSplits = sequelize.define(
    "rch_list_slices_without_def_splits",
    {
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      recharge_slice_desc: {
        type: TEXT,
      },
      recharge_project_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      active: {
        type: BOOLEAN,
      },
      structure_desc: {
        type: TEXT,
      },
      recharge_decree_desc: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ListRechargeSlicesWithoutDefaultSplits;
};
