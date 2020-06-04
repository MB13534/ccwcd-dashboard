module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const AlertListAddresses = sequelize.define(
    "alert_list_addresses",
    {
      merged_address_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      addresses: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return AlertListAddresses;
};
