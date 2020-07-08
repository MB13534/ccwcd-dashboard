module.exports = (sequelize, DataTypes) => {
  const { INTEGER, DATE, TEXT } = DataTypes;
  const UrfImportSliceLanding = sequelize.define(
    "rch_urf_import_slice_landing",
    {
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      gid: {
        type: TEXT,
      },
      created_at: {
        type: DATE,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return UrfImportSliceLanding;
};
