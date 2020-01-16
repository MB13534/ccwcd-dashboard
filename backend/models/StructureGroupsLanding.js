module.exports = (sequelize, DataTypes) => {
  const StructureGroupsLanding = sequelize.define('landing_structure_groups', {
    group_ndx: {
      type: DataTypes.INTEGER,
    },
    group_name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    centroid_lon_dd: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    centroid_lat_dd: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    extent_diameter_ft: {
      type: DataTypes.REAL,
    },
    notes: {
      type: DataTypes.STRING,
      trim: true,
    },
    ui: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    delete_flag: {
      type: DataTypes.BOOLEAN,
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return StructureGroupsLanding;
};
