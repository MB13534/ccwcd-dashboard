module.exports = (sequelize, DataTypes) => {
  const { DATE } = DataTypes;
  const DeplLastRun = sequelize.define(
    'last_run',
    {
      last_run: {
        type: DATE,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
      schema: 'contracts_sync',
      freezeTableName: true,
    }
  );
  return DeplLastRun;
};
