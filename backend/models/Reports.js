module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, ARRAY } = DataTypes;
  const ReportsView = sequelize.define(
    "list_reports",
    {
      report_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      report_name: {
        type: STRING,
      },
      report_description: {
        type: STRING,
      },
      path: {
        type: STRING,
      },
      assoc_role_id: {
        type: ARRAY(STRING),
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ReportsView;
};
