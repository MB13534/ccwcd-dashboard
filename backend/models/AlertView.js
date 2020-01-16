module.exports = (sequelize, DataTypes) => {
  const AlertView = sequelize.define('view_alert_requests_config', {
    alert_request_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    alert_name: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false,
    },
    measure_ndx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    structure_name: {
      type: DataTypes.STRING
    },
    measure_type_name: {
      type: DataTypes.STRING,
    },
    alert_type_ndx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alert_type_ndx: {
      type: DataTypes.INTEGER,
    },
    alert_type_desc: {
      type: DataTypes.STRING,
    },
    sub_function_desc: {
      type: DataTypes.STRING,
    },
    sub_function_ndx: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alert_value: {
      type: DataTypes.FLOAT,
    },
    unit_abbrev: {
      type: DataTypes. STRING,
    },
    reset_interval_hours: {
      type: DataTypes.FLOAT,
    },
    alert_address_ndx: {
      type: DataTypes.INTEGER,
    },
    alert_address: {
      type: DataTypes.STRING,
    },
    enabled: {
      type: DataTypes.BOOLEAN,
    },
    notes: {
      type: DataTypes.STRING,
      trim: true,
    },
  }, {
    timestamps: false,
    schema: 'alert',
    freezeTableName: true,
  });
  return AlertView;
};
