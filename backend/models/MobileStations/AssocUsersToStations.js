module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, ARRAY } = DataTypes;
  const AssocUsersToStations = sequelize.define(
    'assoc_users_to_stations_for_mobile',
    {
      auth0_user_id: {
        type: TEXT,
        primaryKey: true,
      },
      assoc_station_ndx: {
        type: ARRAY(INTEGER),
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return AssocUsersToStations;
};
