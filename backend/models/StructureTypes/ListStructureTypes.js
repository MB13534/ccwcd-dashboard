module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListStructureTypes = sequelize.define(
    "list_structure_types",
    {
      structure_type_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      structure_type_desc: {
        type: TEXT,
      },
      remark: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListStructureTypes;
};
