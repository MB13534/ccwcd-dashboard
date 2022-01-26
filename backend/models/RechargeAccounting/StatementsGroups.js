module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const StatementsGroups = sequelize.define(
    'rch_statement_groups_list',
    {
      statement_group_ndx: {
        type: INTEGER,
        primaryKey: true,
      },
      statement_group_desc: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return StatementsGroups;
};
