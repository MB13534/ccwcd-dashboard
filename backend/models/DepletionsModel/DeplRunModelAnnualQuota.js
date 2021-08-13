module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT } = DataTypes;
  const AnnualQuota = sequelize.define(
    'data_annual_quota',
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
    },
    {
      timestamps: false,
      schema: 'data',
      freezeTableName: true,
    }
  );
  return AnnualQuota;
};
