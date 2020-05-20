module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListRechargeProjects = sequelize.define(
    "list_recharge_projects",
    {
      recharge_project_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recharge_project_desc: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListRechargeProjects;
};
