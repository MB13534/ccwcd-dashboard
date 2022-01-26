module.exports = (sequelize, DataTypes) => {
  const { INTEGER, REAL, TEXT } = DataTypes;
  const StatementsDitch = sequelize.define(
    'rch_statement_groups_ditch_statement',
    {
      op_year: {
        type: INTEGER,
        primaryKey: true,
      },
      op_quarter: {
        type: INTEGER,
        primaryKey: true,
      },
      op_quarter_mo: {
        type: INTEGER,
      },
      statement_group_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      r_year: {
        type: INTEGER,
      },
      r_month: {
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
      dtch_pct: {
        type: REAL,
      },
      in_ditch_diversions: {
        type: REAL,
      },
      off_ditch_diversions: {
        type: REAL,
      },
      total_from_river: {
        type: REAL,
      },
      in_ditch_recharge_credits: {
        type: REAL,
      },
      off_ditch_recharge_credits: {
        type: REAL,
      },
      total_recharge_credits: {
        type: REAL,
      },
      cu_allowed: {
        type: REAL,
      },
      credit_value_usd: {
        type: REAL,
      },
    },
    {
      defaultScope: {
        order: [
          ['statement_group_ndx', 'asc'],
          ['op_year', 'asc'],
          ['op_quarter', 'asc'],
        ],
      },
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return StatementsDitch;
};
