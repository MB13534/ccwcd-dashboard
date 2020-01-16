module.exports = (sequelize, DataTypes) => {
  const StructureGroupsView = sequelize.define('list_structure_groups', {
    group_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    group_name: {
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
  return StructureGroupsView;
};
