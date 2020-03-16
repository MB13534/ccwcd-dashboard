module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT, DATE } = DataTypes;
  const ContractsWellsMetersView = sequelize.define(
    "member_meterreadings_correction_factors_view",
    {
      meter_index: {
        type: INTEGER,
      },
      meter_sn: {
        type: TEXT,
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
      ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ContractsWellsMetersView;
};
