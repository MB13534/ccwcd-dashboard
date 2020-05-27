module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListRechargeProjects = sequelize.define(
    "list_recharge_projects",
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
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListRechargeProjects;
};
