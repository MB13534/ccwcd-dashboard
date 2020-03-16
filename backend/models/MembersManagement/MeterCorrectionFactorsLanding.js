module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT, DATE, BOOLEAN } = DataTypes;
  const MeterCorrectionFactorsLanding = sequelize.define(
    "data_member_meterreadings_correction_factors",
    {
      ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      meter_index: {
        type: INTEGER,
      },
      test_date: {
        type: DATE,
      },
      correction_factor: {
        type: REAL,
      },
      notes: {
        type: TEXT,
      },
      invalid: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return MeterCorrectionFactorsLanding;
};
