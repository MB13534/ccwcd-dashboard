module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT, BOOLEAN, DOUBLE } = DataTypes;
  const WellAttributes = sequelize.define(
    "list_member_wells",
    {
      well_index: {
        type: INTEGER,
        primaryKey: true,
      },
      wdid: {
        type: TEXT,
      },
      notes: {
        type: TEXT,
      },
      permit_no: {
        type: TEXT,
      },
      reach_index: {
        type: INTEGER,
      },
      admin_no: {
        type: DOUBLE,
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
      treat_div_as_surface: {
        type: BOOLEAN,
      },
      inactive: {
        type: BOOLEAN,
      },    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return WellAttributes
  ;
};
