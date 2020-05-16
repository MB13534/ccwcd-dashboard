module.exports = (sequelize, DataTypes) => {
  const { REAL, INTEGER, TEXT } = DataTypes;
  const WellsReview = sequelize.define(
    "pump_3_well_pumping_review_attributes",
    {
      glv_chk: {
        type: TEXT,
      },
      rch_chk: {
        type: TEXT,
      },
      adm_chk: {
        type: TEXT,
      },
      wdid: {
        type: TEXT,
        primaryKey: true,
      },
      op_year: {
        type: INTEGER,
        primaryKey: true,
      },
      well_pumping_af: {
        type: REAL,
      },
      reach_name: {
        type: TEXT,
      },
      admin_no: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return WellsReview;
};
