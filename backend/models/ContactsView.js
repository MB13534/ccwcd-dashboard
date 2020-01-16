module.exports = (sequelize, DataTypes) => {
  const ContactsView = sequelize.define('list_contacts', {
    contact_ndx: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    contact_address: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    contact_name: {
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
    },
    contact_org: {
      type: DataTypes.STRING,
      trim: true,
    },
    contact_group_name: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    notes: {
      type: DataTypes.STRING,
      trim: true,
    },
    delete_flag: {
      type: DataTypes.BOOLEAN,
    },
    alerts_enabled: {
      type: DataTypes.BOOLEAN,
    },
    contact_phone:  {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return ContactsView;
};
