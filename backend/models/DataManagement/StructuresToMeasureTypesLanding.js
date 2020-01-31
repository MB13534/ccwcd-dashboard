module.exports = (sequelize, DataTypes) => {
  const StructuresToMeasureTypesLanding = sequelize.define('landing_structures_to_measuretypes', {
    structure_ndx: {
      type: DataTypes.INTEGER,
    },
    structure_name: {
      type: DataTypes.INTEGER,
    },
    measure_type_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    unit_ndx: {
      type: DataTypes.INTEGER,
    },
    control_type_ndx: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return StructuresToMeasureTypesLanding;
};
