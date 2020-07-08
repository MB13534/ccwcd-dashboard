module.exports = (sequelize, DataTypes) => {
  const { INTEGER } = DataTypes;
  const SelectedLaggingPeriod = sequelize.define(
    "rch_selected_lagging_period",
    {
      sel_year: {
        type: INTEGER,
        primaryKey: true,
      },
      sel_month: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return SelectedLaggingPeriod;
};
