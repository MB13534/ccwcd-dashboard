module.exports = (sequelize, DataTypes) => {
  const { ARRAY, INTEGER, TEXT, BOOLEAN, NUMBER } = DataTypes;
  const ListStructures = sequelize.define(
    'list_structures',
    {
      structure_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      structure_desc: {
        type: TEXT,
      },
      structure_type_ndx: {
        type: INTEGER,
      },
      assoc_station_ndx: {
        type: ARRAY(INTEGER),
      },
      remark: {
        type: TEXT,
      },
      inactive: {
        type: BOOLEAN,
      },
      rech_structure_type_ndx: {
        type: INTEGER,
      },
      to_accounting_flows_table: {
        type: BOOLEAN,
      },
      lon_dd: {
        type: NUMBER,
      },
      lat_dd: {
        type: NUMBER,
      },
    },
    {
      timestamps: false,
      schema: 'data',
      freezeTableName: true,
    }
  );
  return ListStructures;
};
