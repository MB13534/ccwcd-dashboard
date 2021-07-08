module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListRechargePlans = sequelize.define(
    "rch_list_plans",
    {
      plan_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      plan_abbrev: {
        type: TEXT,
      },
      plan_name: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ListRechargePlans;
};
