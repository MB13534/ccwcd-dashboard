module.exports = (sequelize, DataTypes) => {
  const UnitsView = sequelize.define('list_units', {
    unit_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    unit_name: {
      type: DataTypes.STRING,
    },
    unit_abbrev: {
      type: DataTypes.STRING,
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
  return UnitsView;
};
