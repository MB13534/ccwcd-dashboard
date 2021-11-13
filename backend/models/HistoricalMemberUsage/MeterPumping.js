module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, ARRAY, REAL } = DataTypes;
  const MeterPumping = sequelize.define(
    'historical_meter_pumping_report',
    {
      well_index: {
        type: ARRAY(INTEGER),
      },
      meter_index: {
        type: INTEGER,
        primaryKey: true,
      },
      meter_sn: {
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
      remark: {
        type: TEXT,
      },
      wdids: {
        type: TEXT,
      },
      adjusted_af: {
        type: REAL,
      },
      corrected_af: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return MeterPumping;
};
