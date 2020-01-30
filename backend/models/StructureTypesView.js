module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, BOOLEAN } = DataTypes;
  const StructureTypesView = sequelize.define(
    "atv_list_structure_types",
    {
      structure_type_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      structure_type_desc: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return StructureTypesView;
};
