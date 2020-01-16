module.exports = (sequelize, DataTypes) => {
  const AlertLanding = sequelize.define('landing_alerts', {
    alert_request_ndx: {
      type: DataTypes.INTEGER,
    },
    alert_name: {
      type: DataTypes.STRING,
      primaryKey: true,
      trim: true,
      allowNull: false,
    },
    measure_ndx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alert_type_ndx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sub_function_ndx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alert_value: {
      type: DataTypes.FLOAT,
    },
    reset_interval_hours: {
      type: DataTypes.FLOAT,
    },
    alert_address_ndx: {
      type: DataTypes.INTEGER,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
    },
    notes: {
      type: DataTypes.STRING,
      trim: true,
    },
    delete_flag: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return AlertLanding;
};
