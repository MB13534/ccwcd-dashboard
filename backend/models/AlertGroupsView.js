module.exports = (sequelize, DataTypes) => {
  const AlertGroupsView = sequelize.define('view_people_groups_merged', {
    contact_type: {
      type: DataTypes.INTEGER,
    },
    alert_address_ndx: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    alert_entity_ndx: {
      type: DataTypes.INTEGER,
    },
    alert_entity_name: {
      type: DataTypes.STRING,
      trim: true,
    },
    addresses: {
      type: DataTypes.STRING,
      trim: true,
    },
  }, {
    timestamps: false,
    schema: 'data',
    freezeTableName: true,
  });
  return AlertGroupsView;
};
