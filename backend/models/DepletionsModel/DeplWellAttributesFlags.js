module.exports = (sequelize, DataTypes) => {
  const { DOUBLE, INTEGER, REAL, TEXT } = DataTypes;
  const DeplWellAttributesFlags = sequelize.define(
    "dpl_flags_well_attributes_details",
    {
      glv_chk: {
        type: TEXT,
        primaryKey: true,
      },
      rch_chk: {
        type: TEXT,
      },
      adm_chk: {
        type: TEXT,
      },
      wdid: {
        type: TEXT,
      },
      op_year: {
        type: INTEGER,
      },
      well_pumping_af: {
        type: REAL,
      },
      glover_x: {
        type: REAL,
      },
      glover_w: {
        type: REAL,
      },
      glover_t_gpdf: {
        type: REAL,
      },
      reach_name: {
        type: TEXT,
      },
      admin_no: {
        type: DOUBLE,
      },
      well_index: {
        type: INTEGER,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return DeplWellAttributesFlags;
};
