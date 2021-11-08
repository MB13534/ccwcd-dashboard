module.exports = (sequelize, DataTypes) => {
  const { DATE } = DataTypes;
  const DeplHistoricalWellInfoReport = sequelize.define(
    'historical_well_info_report',
    {
      updated_timestamp: {
        type: DATE,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return DeplHistoricalWellInfoReport;
};
