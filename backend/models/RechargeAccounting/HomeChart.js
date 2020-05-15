module.exports = (sequelize, DataTypes) => {
  const { NUMERIC, DATE } = DataTypes;
  const HomeChart = sequelize.define(
    "rch_home_combo_chart",
    {
      r_date: {
        type: DATE,
        primaryKey: true,
      },
      unlagged_af: {
        type: NUMERIC,
      },
      lagged_af: {
        type: NUMERIC,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return HomeChart;
};
