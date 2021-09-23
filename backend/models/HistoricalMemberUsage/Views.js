module.exports = (sequelize, DataTypes) => {
  const { INTEGER, ARRAY, TEXT, BOOLEAN } = DataTypes;
  const ReportsView = sequelize.define(
    'report_views_historical_member_usage',
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
      well_index: {
        type: ARRAY(INTEGER),
      },
      dataset: {
        type: TEXT,
      },
      depletion_start_year: {
        type: INTEGER,
      },
      view_default: {
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
