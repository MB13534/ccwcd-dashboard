module.exports = (sequelize, DataTypes) => {
  const { BOOLEAN, TEXT } = DataTypes;
  const DeplFlagsReport = sequelize.define(
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
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return DeplFlagsReport;
};
