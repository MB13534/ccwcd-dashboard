module.exports = (sequelize, DataTypes) => {
  const { REAL, TEXT, DATE, DECIMAL } = DataTypes;
  const DeplNewDataDetails = sequelize.define(
    'dpl_meter_readings_entered_since_last_details',
    {
      created: {
        type: DATE,
        primaryKey: true,
      },
      meter_sn: {
        type: TEXT,
      },
      collect_date: {
        type: DATE,
      },
      reading: {
        type: DECIMAL,
      },
      unit_desc: {
        type: TEXT,
      },
      source: {
        type: TEXT,
      },
      prev_collect_date: {
        type: DATE,
      },
      prev_reading: {
        type: DECIMAL,
      },
      metered_pumping_af: {
        type: REAL,
      },
      correction_factor: {
        type: DECIMAL,
      },
      adjustment: {
        type: DECIMAL,
      },
      correction_factor_test_date: {
        type: DATE,
      },
      actual_correction_factor: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return DeplNewDataDetails;
};
