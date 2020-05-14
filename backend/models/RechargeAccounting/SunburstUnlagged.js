module.exports = (sequelize, DataTypes) => {
  const { NUMERIC, TEXT } = DataTypes;
  const SunburstUnlagged = sequelize.define(
    "rch_home_sunburst_unlagged",
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
      unlagged_af: {
        type: NUMERIC,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return SunburstUnlagged;
};
