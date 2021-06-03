module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, ARRAY } = DataTypes;
  const Stations = sequelize.define(
    'mob_list_stations',
    {
      station_group_desc: {
        type: TEXT,
      },
      station_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      station_name: {
        type: TEXT,
      },
      assoc_users: {
        type: ARRAY(TEXT),
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return Stations;
};
