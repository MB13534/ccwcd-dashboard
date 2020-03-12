module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const MetersView = sequelize.define(
    "member_list_meters",
    {
      meter_index: {
        type: INTEGER,
        primaryKey: true,
      },
      meter_sn: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return MetersView;
};
