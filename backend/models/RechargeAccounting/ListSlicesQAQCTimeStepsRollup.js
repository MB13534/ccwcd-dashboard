module.exports = (sequelize, DataTypes) => {
  const { INTEGER, BOOLEAN } = DataTypes;
  const ListSlicesQAQCTimeStepsRollup = sequelize.define(
    "rch_list_slices_qaqc_timesteps_rollup",
    {
      r_year: {
        type: INTEGER,
        primaryKey: true,
      },
      r_month: {
        type: INTEGER,
        primaryKey: true,
      },
      qaqc_issue: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ListSlicesQAQCTimeStepsRollup;
};
