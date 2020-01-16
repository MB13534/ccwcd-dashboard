module.exports = (sequelize, DataTypes) => {
  const MeasurementsView = sequelize.define('list_measurements', {
    measure_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    measure_name: {
      type: DataTypes.STRING,
    },
    structure_ndx: {
      type: DataTypes.INTEGER,
    },
    measure_type_ndx: {
      type: DataTypes.INTEGER,
    },
    measure_type_name: {
      type: DataTypes.STRING,
    },
    unit_ndx: {
      type: DataTypes.INTEGER
    },
    notes: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return MeasurementsView;
};
