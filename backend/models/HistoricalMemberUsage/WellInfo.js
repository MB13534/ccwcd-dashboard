module.exports = (sequelize, DataTypes) => {
  const { INTEGER, DOUBLE, TEXT } = DataTypes;
  const WellInfo = sequelize.define(
    "historical_well_info_report",
    {
      well_index: {
        type: INTEGER,
        primaryKey: true,
      },
      wdid: {
        type: TEXT,
      },
      meters: {
        type: TEXT,
      },
      contracts: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return WellInfo;
};
