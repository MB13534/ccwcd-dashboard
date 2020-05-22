module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListReaches = sequelize.define(
    "list_reaches",
    {
      reach_index: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      reach_name: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListReaches;
};
