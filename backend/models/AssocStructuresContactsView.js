module.exports = (sequelize, DataTypes) => {
  const AssocStructuresContactsView = sequelize.define('view_assoc_structures_contacts', {
    structure_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    contact_ndx: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return AssocStructuresContactsView;
};
