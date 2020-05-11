module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, ARRAY, DOUBLE, BOOLEAN } = DataTypes;
  const StructuresView = sequelize.define(
    "list_structures",
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
      structure_type_ndx: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return StructuresView;
};
