module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListExternalAugPlans = sequelize.define(
    'list_external_aug_plans',
    {
      plan_index: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      plan_name: {
        type: TEXT,
      },
      plan_type: {
        type: TEXT,
      },
      contact_name: {
        type: TEXT,
      },
      contact_phone: {
        type: TEXT,
      },
      contact_email: {
        type: TEXT,
      },
      plan_notes: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: 'data',
      freezeTableName: true,
    }
  );
  return ListExternalAugPlans;
};
