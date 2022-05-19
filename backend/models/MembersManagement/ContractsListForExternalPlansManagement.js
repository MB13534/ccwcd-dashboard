module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ContractsListForExternalPlansManagement = sequelize.define(
    'contracts_list_for_external_plans_management',
    {
      contract_index: {
        type: INTEGER,
        primaryKey: true,
      },
      subdistrict: {
        type: TEXT,
      },
      contact_name: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return ContractsListForExternalPlansManagement;
};
