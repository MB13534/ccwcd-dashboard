module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const AssocExternalPlansToContracts = sequelize.define(
    'assoc_external_plans_to_contracts_testing',
    {
      plan_index: {
        type: INTEGER,
        primaryKey: true,
      },
      op_year: {
        type: TEXT,
      },
      contract_index: {
        type: TEXT,
      },
      plan_notes: {
        type: TEXT,
      },
      invalid: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: 'data',
      freezeTableName: true,
    }
  );
  return AssocExternalPlansToContracts;
};
