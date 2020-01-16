module.exports = (sequelize, DataTypes) => {
  const StructuresView = sequelize.define('list_structures', {
    structure_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    structure_name: {
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
    structure_type_ndx: {
      type: DataTypes.INTEGER
    },
    structure_type_name: {
      type: DataTypes.STRING,
    },
    measure_type_name: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    group_ndx: {
      type: DataTypes.INTEGER
    },
    group_name: {
      type: DataTypes.STRING,
    },
    status_ndx: {
      type: DataTypes.INTEGER
    },
    status_descrip: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return StructuresView;
};
