module.exports = (sequelize, DataTypes) => {
  const StructuresLanding = sequelize.define('landing_structures', {
    structure_ndx: {
      type: DataTypes.INTEGER,
    },
    structure_name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false
    },
    lon_dd: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lat_dd: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    group_ndx: {
      type: DataTypes.INTEGER,
    },
    structure_type_ndx: {
      type: DataTypes.INTEGER,
    },
    status_ndx: {
      type: DataTypes.INTEGER,
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
  return StructuresLanding;
};
