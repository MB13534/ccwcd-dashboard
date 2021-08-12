module.exports = (sequelize, DataTypes) => {
  const { BIGINT, REAL, DATE } = DataTypes;
  const DeplNewDataOverview = sequelize.define(
    'dpl_meter_readings_entered_since_last_overview',
    {
      entry_count: {
        type: BIGINT,
        primaryKey: true,
      },
      from_collect_date: {
        type: DATE,
      },
      from_entry_date: {
        type: DATE,
      },
      total_pumped: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return DeplNewDataOverview;
};
