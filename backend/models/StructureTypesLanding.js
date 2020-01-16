module.exports = (sequelize, DataTypes) => {
  const StructureTypesLanding = sequelize.define('landing_types_structures', {
    structure_type_ndx: {
      type: DataTypes.INTEGER,
    },
    structure_type_name: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    ui: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
  return StructureTypesLanding;
};
