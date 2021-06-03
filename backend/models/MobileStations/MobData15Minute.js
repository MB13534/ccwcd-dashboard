module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, REAL, DATE } = DataTypes;
  const MobData15Min = sequelize.define(
    'mob_data_15minute',
    {
      station_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      station_name: {
        type: TEXT,
        primaryKey: true,
      },
      collect_timestamp: {
        type: DATE,
      },
      measured_value: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return MobData15Min;
};
