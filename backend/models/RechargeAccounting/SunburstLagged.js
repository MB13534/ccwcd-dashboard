module.exports = (sequelize, DataTypes) => {
  const { NUMERIC, TEXT } = DataTypes;
  const SunburstLagged = sequelize.define(
    "rch_home_sunburst_lagged",
    {
      id: {
        type: TEXT,
        primaryKey: true,
      },
      split: {
        type: TEXT,
      },
      project: {
        type: TEXT,
      },
      structure: {
        type: TEXT,
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
  return SunburstLagged;
};
