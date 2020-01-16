module.exports = (sequelize, DataTypes) => {
  const MeasurementTypesView = sequelize.define('list_types_measurements', {
    measure_type_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    measure_type_name: {
      type: DataTypes.STRING,
    },
    unit_abbrev: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    ui: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
    },
    delete_flag: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return MeasurementTypesView;
};
