module.exports = (sequelize, DataTypes) => {
  const ContactsLanding = sequelize.define('landing_contacts', {
    contact_ndx: {
      type: DataTypes.INTEGER,
    },
    contact_address: {
      primaryKey: true,
      type: DataTypes.STRING,
      allowNull: false,
      trim: true,
      validate: {
        isEmail: true,
      },
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
      trim: true,
    }
  }, {
    timestamps: false,
    schema: 'data_management',
    freezeTableName: true,
  });
  return ContactsLanding;
};
