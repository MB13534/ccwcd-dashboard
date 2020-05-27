module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListRechargeSlices = sequelize.define(
    "list_recharge_slices",
    {
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recharge_slice_desc: {
        type: TEXT,
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
      gms_reach: {
        type: INTEGER,
      },
      was_reach: {
        type: INTEGER,
      },
      crep_pivot_group_1: {
        type: INTEGER,
      },
      crep_pivot_group_2: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListRechargeSlices;
};
