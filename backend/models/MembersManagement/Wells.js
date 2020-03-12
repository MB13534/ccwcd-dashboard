module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const WellsView = sequelize.define(
    "member_list_wells",
    {
      well_index: {
        type: INTEGER,
        primaryKey: true,
      },
      wdid: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return WellsView;
};
