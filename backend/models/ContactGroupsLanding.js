module.exports = (sequelize, DataTypes) => {
  const ContactGroupsLanding = sequelize.define('landing_contact_groups', {
    contact_group_ndx: {
      type: DataTypes.INTEGER,
    },
    contact_group_name: {
      primaryKey: true,
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
  return ContactGroupsLanding;
};
