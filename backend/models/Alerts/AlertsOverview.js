module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, REAL, DATE, BOOLEAN } = DataTypes;
  const AlertsOverview = sequelize.define(
    "alert_overview",
    {
      alert_request_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      station_ndx: {
        type: INTEGER,
      },
      measure_type_ndx: {
        type: INTEGER,
      },
      alert_type_ndx: {
        type: INTEGER,
      },
      alert_value: {
        type: REAL,
      },
      trigger_units: {
        type: TEXT,
      },
      merged_address_ndx: {
        type: INTEGER,
      },
      reset_interval_hours: {
        type: REAL,
      },
      last_alert_sent: {
        type: DATE,
      },
      most_recent_timestamp: {
        type: DATE,
      },
      most_recent_value: {
        type: REAL,
      },
      triggered: {
        type: TEXT,
      },
      enabled: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return AlertsOverview;
};
