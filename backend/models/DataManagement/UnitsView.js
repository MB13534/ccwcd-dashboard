module.exports = (sequelize, DataTypes) => {
  const UnitsView = sequelize.define(
    "list_units",
    {
      unit_ndx: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      unit_desc: {
        type: DataTypes.STRING,
      },
      remark: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return UnitsView;
};
