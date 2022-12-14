module.exports = (sequelize, DataTypes) => {
  const { INTEGER, BOOLEAN, ARRAY, TEXT } = DataTypes;
  const ReportsView = sequelize.define(
    'list_reports',
    {
      report_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      report_name: {
        type: TEXT,
      },
      report_description: {
        type: TEXT,
      },
      path: {
        type: TEXT,
      },
      assoc_role_id: {
        type: ARRAY(TEXT),
      },
      report_enabled: {
        type: BOOLEAN,
      },
      views_enabled: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return ReportsView;
};
