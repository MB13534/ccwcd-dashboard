module.exports = (sequelize, DataTypes) => {
  const AlertTypesView = sequelize.define('list_types_alerts', {
    alert_type_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alert_type_desc: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return AlertTypesView;
};
