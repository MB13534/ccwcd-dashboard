module.exports = (sequelize, DataTypes) => {
  const AssocContactsGroupsLanding = sequelize.define('landing_assoc_contacts_groups', {
    contact_ndx: {
      type: DataTypes.INTEGER,
    },
    contact_address: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      trim: true,
    },
    contact_group_ndx: {
      type: DataTypes.STRING,
      allowNull: false,      
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return AssocContactsGroupsLanding;
};
