module.exports = (sequelize, DataTypes) => {
  const { NUMERIC, TEXT, INTEGER } = DataTypes;
  const ReviewImportsCrosstab = sequelize.define(
    "rch_review_imports_crosstab",
    {
      recharge_slice_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      recharge_project_desc: {
        type: TEXT,
      },
      structure_desc: {
        type: TEXT,
      },
      recharge_decree_desc: {
        type: TEXT,
      },
      Apr: {
        type: NUMERIC,
      },
      May: {
        type: NUMERIC,
      },
      Jun: {
        type: NUMERIC,
      },
      Jul: {
        type: NUMERIC,
      },
      Aug: {
        type: NUMERIC,
      },
      Sep: {
        type: NUMERIC,
      },
      Oct: {
        type: NUMERIC,
      },
      Nov: {
        type: NUMERIC,
      },
      Dec: {
        type: NUMERIC,
      },
      Jan: {
        type: NUMERIC,
      },
      Feb: {
        type: NUMERIC,
      },
      Mar: {
        type: NUMERIC,
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ReviewImportsCrosstab;
};
