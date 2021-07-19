module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, DATE, TEXT } = DataTypes;
  const DeplPumpingDataFlags = sequelize.define(
    "dpl_flags_pumping_data_details",
    {
      flag: {
        type: TEXT,
        primaryKey: true,
      },
      i_year: {
        type: INTEGER,
      },
      i_month: {
        type: INTEGER,
      },
      time_step_index: {
        type: INTEGER,
      },
      well_index: {
        type: INTEGER,
      },
      wdid: {
        type: TEXT,
      },
      contracts: {
        type: TEXT,
      },
      metered_pumping: {
        type: REAL,
      },
      meters: {
        type: TEXT,
      },
      last_reading_date: {
        type: DATE,
      },
      estimated_pumping: {
        type: REAL,
      },
      override_pumping: {
        type: REAL,
      },
      fraction_metered: {
        type: REAL,
      },
      plan_type: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return DeplPumpingDataFlags;
};
