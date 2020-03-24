module.exports = (sequelize, DataTypes) => {
  const { INTEGER, DOUBLE, TEXT } = DataTypes;
  const WellDepletions = sequelize.define(
    "historical_well_depletions_report",
    {
      subdistrict: {
        type: TEXT,
      },
      dplset: {
        type: TEXT,
        primaryKey: true,
      },
      well_index: {
        type: INTEGER,
        primaryKey: true,
      },
      wdid: {
        type: TEXT,
      },
      i_year: {
        type: INTEGER,
        primaryKey: true,
      },
      i_month: {
        type: INTEGER,
        primaryKey: true,
      },
      dpl_af: {
        type: DOUBLE,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return WellDepletions;
};
