module.exports = (sequelize, DataTypes) => {
  const { BOOLEAN, TEXT } = DataTypes;
  const FlagsReport = sequelize.define(
    "rch_home_flags_report",
    {
      msg: {
        type: TEXT,
        primaryKey: true,
      },
      urfs: {
        type: BOOLEAN,
      },
      splits: {
        type: BOOLEAN,
      },
      def_splits: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return FlagsReport;
};
