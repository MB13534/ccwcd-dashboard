module.exports = (sequelize, DataTypes) => {
  const AlertSubFunctionsView = sequelize.define('list_alert_sub_function', {
    sub_function_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sub_function_desc: {
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
  return AlertSubFunctionsView;
};
