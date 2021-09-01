module.exports = (sequelize, DataTypes) => {
  const { INTEGER, DATE, ARRAY, TEXT, BOOLEAN } = DataTypes;
  const ReportsView = sequelize.define(
    'report_views_atv',
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
      structure_types: {
        type: ARRAY(INTEGER),
      },
      structures: {
        type: ARRAY(INTEGER),
      },
      measurement_types: {
        type: ARRAY(INTEGER),
      },
      aggregation_level: {
        type: TEXT,
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
