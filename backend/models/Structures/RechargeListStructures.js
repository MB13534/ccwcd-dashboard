module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const RechargeListStructures = sequelize.define(
    "rch_list_structures",
    {
      structure_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      structure_desc: {
        type: TEXT,
      },
      rech_structure_type_ndx: {
        type: INTEGER,
      },
      rech_structure_type_desc: {
        type: TEXT,
      },
      structure_type_ndx: {
        type: INTEGER,
      },
      structure_type_desc: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return RechargeListStructures;
};
