module.exports = (sequelize, DataTypes) => {
  const StatusView = sequelize.define('list_types_status', {
    status_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status_descrip: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return StatusView;
};
