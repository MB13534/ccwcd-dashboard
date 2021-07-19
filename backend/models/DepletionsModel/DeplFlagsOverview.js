module.exports = (sequelize, DataTypes) => {
  const { BOOLEAN, TEXT } = DataTypes;
  const DeplFlagsOverview = sequelize.define(
    "dpl_flags_report",
    {
      msg: {
        type: TEXT,
        primaryKey: true,
      },
      negative_pumping: {
        type: BOOLEAN,
      },
      missing_meter: {
        type: BOOLEAN,
      },
      metered_inoperable: {
        type: BOOLEAN,
      },
      glover_or_urf_missing: {
        type: BOOLEAN,
      },
      reach_missing: {
        type: BOOLEAN,
      },
      admin_number_missing: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return DeplFlagsOverview;
};
