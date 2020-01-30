module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, BOOLEAN } = DataTypes;
  const StructureTypesView = sequelize.define(
    "list_structure_types",
    {
      structure_type_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      structure_type_desc: {
        type: DataTypes.STRING,
      },
      remark: {
        type: DataTypes.STRING,
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
  return StructureTypesView;
};
