module.exports = (sequelize, DataTypes) => {
  const StructureTypesView = sequelize.define('list_types_structures', {
    structure_type_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    structure_type_name: {
      type: DataTypes.STRING,
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
  return StructureTypesView;
};
