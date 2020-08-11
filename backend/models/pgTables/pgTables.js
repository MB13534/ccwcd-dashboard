module.exports = (sequelize, DataTypes) => {
  const { TEXT } = DataTypes;
  const pgTables = sequelize.define(
    "pg_tables",
    {
      schemaname: {
        type: TEXT,
        primaryKey: true,
      },
      tablename: {
        type: TEXT,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      schema: "pg_catalog",
      freezeTableName: true,
    }
  );
  return pgTables;
};
