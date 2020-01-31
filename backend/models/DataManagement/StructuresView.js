module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, ARRAY, DOUBLE, BOOLEAN } = DataTypes;
  const StructuresView = sequelize.define(
    "atv_list_structures",
    {
      structure_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      structure_desc: {
        type: STRING,
        allowNull: false,
      },
      assoc_structure_type_ndx: {
        type: ARRAY(INTEGER),
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return StructuresView;
};
