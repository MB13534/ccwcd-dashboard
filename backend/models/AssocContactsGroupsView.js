module.exports = (sequelize, DataTypes) => {
  const AssocContactsGroupsView = sequelize.define('view_assoc_contacts_groups', {
    contact_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    contact_group_ndx: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    contact_group_name: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return AssocContactsGroupsView;
};
