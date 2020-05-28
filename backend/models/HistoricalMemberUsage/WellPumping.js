module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT, BOOLEAN } = DataTypes;
  const WellPumping = sequelize.define(
    "historical_well_pumping_report",
    {
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
      pumping_af: {
        type: REAL,
      },
      fraction_metered: {
        type: REAL,
      },
      fraction_estimated: {
        type: REAL,
      },
      inoperable: {
        type: BOOLEAN,
      },
      plan_covered_af: {
        type: REAL,
      },
      contracts: {
        type: TEXT,
      },
      subdistrict: {
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
