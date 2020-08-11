module.exports = (sequelize, DataTypes) => {
  const { TEXT } = DataTypes;
  const Columns = sequelize.define(
    "columns",
    {
      column_name: {
        type: TEXT,
        primaryKey: true,
      },
      data_type: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "information_schema",
      freezeTableName: true,
    }
  );
  return Columns;
};
