module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT, BOOLEAN } = DataTypes;
  const WellPumping = sequelize.define(
    "historical_reach_by_well_pumping_report_view",
    {
      well_index: {
        type: INTEGER,
        primaryKey: true,
      },
      wdid: {
        type: TEXT,
      },
      subdistrict: {
        type: TEXT,
      },
      reach_index: {
        type: INTEGER,
      },
      reach_name: {
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
      modeled_pumping_af: {
        type: REAL,
      },
      total_pumping_af: {
        type: REAL,
      },
      metered_pumping_af: {
        type: REAL,
      },
      estimated_pumping_af: {
        type: REAL,
      },
      external_plan_covered_af: {
        type: REAL,
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
