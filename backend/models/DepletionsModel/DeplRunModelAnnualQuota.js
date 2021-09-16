module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT, BOOLEAN } = DataTypes;
  const AnnualQuota = sequelize.define(
    'dpl_annual_quota',
    {
      op_year: {
        type: INTEGER,
        primaryKey: true,
      },
      subdistrict: {
        primaryKey: true,
        type: TEXT,
      },
      quota: {
        type: REAL,
      },
      notes: {
        type: TEXT,
      },
      run_enabled: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return AnnualQuota;
};
