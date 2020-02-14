module.exports = (sequelize, DataTypes) => {
  const { INTEGER, ARRAY, TEXT } = DataTypes;
  const ReportsView = sequelize.define(
    "report_views_historical_member_usage",
    {
      view_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      view_name: {
        type: TEXT,
        allowNull: false,
        trim: true,
      },
      view_description: {
        type: TEXT,
        trim: true,
      },
      assoc_report_ndx: {
        type: INTEGER,
      },
      assoc_user_id: {
        type: ARRAY(TEXT),
      },
      wdid: {
        type: ARRAY(INTEGER),
      },
      end_month: {
        type: INTEGER,
      },
      end_year: {
        type: INTEGER,
      },
      dataset: {
        type: TEXT,
      },
      display_type: {
        type: TEXT,
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
