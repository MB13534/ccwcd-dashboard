module.exports = (sequelize, DataTypes) => {
  const UnitsLanding = sequelize.define('landing_units', {
    unit_ndx: {
      type: DataTypes.INTEGER,
    },
    unit_name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    unit_abbrev: {
      type: DataTypes.STRING,
      trim: true,
    },
    notes: {
      type: DataTypes.STRING,
      trim: true,
    },
    delete_flag: {
      type: DataTypes.BOOLEAN,
    }
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return UnitsLanding;
};
