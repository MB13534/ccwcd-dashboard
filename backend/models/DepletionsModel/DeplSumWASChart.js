module.exports = (sequelize, DataTypes) => {
  const { NUMERIC, DATE, TEXT } = DataTypes;
  const DplSumWASChart = sequelize.define(
    "dpl_sum_was",
    {
      last_run: {
        type: DATE,
      },
      reach_name: {
        type: TEXT,
        primaryKey: true,
      },
      mo_last_date: {
        type: DATE,
        primaryKey: true,
      },
      dpl_af: {
        type: NUMERIC,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return DplSumWASChart;
};
