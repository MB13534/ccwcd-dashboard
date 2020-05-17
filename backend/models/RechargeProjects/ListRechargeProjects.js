module.exports = (sequelize, DataTypes) => {
  const { ARRAY, INTEGER, TEXT } = DataTypes;
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
      assoc_structure_ndx: {
        type: ARRAY(INTEGER),
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
