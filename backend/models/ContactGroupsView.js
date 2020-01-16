module.exports = (sequelize, DataTypes) => {
  const ContactGroupsView = sequelize.define('list_contact_groups', {
    contact_group_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    contact_group_name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
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
  return ContactGroupsView;
};
