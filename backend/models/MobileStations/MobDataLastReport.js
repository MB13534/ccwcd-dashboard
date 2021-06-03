module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, REAL } = DataTypes;
  const MobDataLastReport = sequelize.define(
    'mob_data_last_report',
    {
      station_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      station_name: {
        type: TEXT,
        primaryKey: true,
      },
      por_end: {
        type: TEXT,
      },
      last_value_received: {
        type: REAL,
      },
      target_value: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return MobDataLastReport;
};
