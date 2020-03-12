module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, DATE, BOOLEAN } = DataTypes;
  const ContractsWellsMetersView = sequelize.define(
    "member_contracts_wells_meters_view",
    {
      contract_index: {
        type: INTEGER,
      },
      well_index: {
        type: INTEGER,
      },
      wdid: {
        type: TEXT,
      },
      meter_index: {
        type: INTEGER,
      },
      meter_sn: {
        type: TEXT,
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
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return ContractsWellsMetersView;
};
