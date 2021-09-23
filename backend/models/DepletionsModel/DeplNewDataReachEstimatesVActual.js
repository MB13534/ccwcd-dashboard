module.exports = (sequelize, DataTypes) => {
  const { REAL, TEXT } = DataTypes;
  const DeplNewDataDetails = sequelize.define(
    'dpl_new_pumping_vs_estimates_summary',
    {
      reach_name: {
        type: TEXT,
        primaryKey: true,
      },
      estimates_af: {
        type: REAL,
      },
      actual_af: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return DeplNewDataDetails;
};
