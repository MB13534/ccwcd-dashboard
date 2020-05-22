module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, ARRAY } = DataTypes;
  const StructuresView = sequelize.define(
    "atv_list_structures",
    {
      structure_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      structure_desc: {
        type: TEXT,
        allowNull: false,
      },
      assoc_structure_type_ndx: {
        type: ARRAY(INTEGER),
      },
      assoc_users: {
        type: ARRAY(TEXT),
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
