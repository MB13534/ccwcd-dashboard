module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, DATE, BOOLEAN } = DataTypes;
  const ContractsWellsMetersLanding = sequelize.define(
    "data_member_contracts_wells_meters",
    {
      contract_index: {
        type: INTEGER,
      },
      well_index: {
        type: INTEGER,
      },
      meter_index: {
        type: INTEGER,
      },
      start_date: {
        type: DATE,
      },
      end_date: {
        type: DATE,
      },
      notes: {
        type: TEXT,
      },
      ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      invalid: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ContractsWellsMetersLanding;
};
