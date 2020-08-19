module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT, BOOLEAN } = DataTypes;
  const WellPumping = sequelize.define(
    "historical_reach_wells_list_report_view",
    {
      subdistrict: {
        type: TEXT,
      },
      well_index: {
        type: INTEGER,
        primaryKey: true,
      },
      wdid: {
        type: TEXT,
      },
      reach_index: {
        type: INTEGER,
        primaryKey: true,
      },
      reach_name: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return WellPumping;
};
