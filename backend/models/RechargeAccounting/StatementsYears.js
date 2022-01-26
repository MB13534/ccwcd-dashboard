module.exports = (sequelize, DataTypes) => {
  const { INTEGER } = DataTypes;
  const StatementsYears = sequelize.define(
    "rch_statement_groups_op_years",
    {
      op_year: {
        type: INTEGER,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return StatementsYears;
};
