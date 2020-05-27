module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListRechargePivotGroups = sequelize.define(
    "list_recharge_pivot_groups",
    {
      recharge_pivot_group_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recharge_pivot_group_desc: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListRechargePivotGroups;
};
