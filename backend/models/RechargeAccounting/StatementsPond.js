module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT } = DataTypes;
  const StatementsPond = sequelize.define(
    'rch_statement_groups_pond_statement',
    {
      op_year: {
        type: INTEGER,
        primaryKey: true,
      },
      op_quarter: {
        type: INTEGER,
        primaryKey: true,
      },
      statement_group_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      r_year: {
        type: INTEGER,
      },
      statement_group_desc: {
        type: TEXT,
      },
      owner: {
        type: TEXT,
      },
      ownr_pct: {
        type: REAL,
      },
      quarterly_gross_diversions: {
        type: REAL,
      },
      ytd_gross_diversions: {
        type: REAL,
      },
      quarterly_ownr_net_recharge: {
        type: REAL,
      },
      ytd_ownr_net_recharge: {
        type: REAL,
      },
      credit_value_usd: {
        type: REAL,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return StatementsPond;
};
