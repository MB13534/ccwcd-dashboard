module.exports = (sequelize, DataTypes) => {
  const StructuresToContactsLanding = sequelize.define('landing_structures_to_contacts', {
    structure_ndx: {
      type: DataTypes.INTEGER,
    },
    structure_name: {
      type: DataTypes.INTEGER,
    },
    contact_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return StructuresToContactsLanding;
};
