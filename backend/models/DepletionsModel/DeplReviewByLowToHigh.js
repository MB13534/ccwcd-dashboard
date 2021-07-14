module.exports = (sequelize, DataTypes) => {
  const { DOUBLE, DATE, NUMERIC, INTEGER, TEXT } = DataTypes;
  const DeplReviewByLowToHigh = sequelize.define(
    'dplmod_02_review_by_lowtohigh',
    {
      op_year: {
        type: DOUBLE,
      },
      created: {
        type: DATE,
      },
      meter_sn: {
        type: TEXT,
        primaryKey: true,
      },
      collect_timestamp: {
        type: DATE,
        primaryKey: true,
      },
      reading: {
        type: NUMERIC,
      },
      unit_desc: {
        type: TEXT,
      },
      prev_collect_timestamp: {
        type: DATE,
      },
      prev_reading: {
        type: NUMERIC,
      },
      prev_unit_desc: {
        type: TEXT,
      },
      final_pumping_af: {
        type: NUMERIC,
      },
      adjustment: {
        type: NUMERIC,
      },
      correction_factor: {
        type: NUMERIC,
      },
      raw_change: {
        type: NUMERIC,
      },
      last_source: {
        type: TEXT,
      },
      notes: {
        type: TEXT,
      },
      meter_index: {
        type: INTEGER,
      },
      last_updated: {
        type: DATE,
      },
      reach_name: {
        type: TEXT,
      },
      subdistrict: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return DeplReviewByLowToHigh;
};
