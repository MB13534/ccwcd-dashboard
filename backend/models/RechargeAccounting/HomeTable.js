module.exports = (sequelize, DataTypes) => {
  const { REAL, INTEGER, TEXT } = DataTypes;
  const HomeTable = sequelize.define(
    "rch_home_table",
    {
      recharge_project_desc: {
        type: TEXT,
      },
      structure_desc: {
        type: TEXT,
      },
      web_record_key: {
        type: TEXT,
        primaryKey: true,
      },
      op_year: {
        type: INTEGER,
        primaryKey: true,
      },
      annual_af: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return HomeTable;
};
