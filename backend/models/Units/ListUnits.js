module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListUnits = sequelize.define(
    "list_units",
    {
      unit_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unit_desc: {
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
  return ListUnits;
};
