module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListRechargeStructureTypes = sequelize.define(
    "list_recharge_structure_types",
    {
      rech_structure_type_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rech_structure_type_desc: {
        type: TEXT,
      },
      remark: {
        type: TEXT,
      },
      sort_order: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListRechargeStructureTypes;
};
