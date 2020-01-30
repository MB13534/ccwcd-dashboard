module.exports = (sequelize, DataTypes) => {
  const { INTEGER, STRING, ARRAY, DOUBLE, BOOLEAN } = DataTypes;
  const StructuresView = sequelize.define(
    "list_structures",
    {
      structure_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      ccwcd_ndx: {
        type: INTEGER,
      },
      structure_desc: {
        type: STRING,
        allowNull: false,
      },
      structure_abrev: {
        type: STRING,
        allowNull: false,
      },
      structure_type_ndx: {
        type: INTEGER,
      },
      assoc_station_ndx: {
        type: ARRAY(INTEGER),
      },
      assoc_structure_group_ndx: {
        type: ARRAY(INTEGER),
      },
      structure_lon: {
        type: DOUBLE,
      },
      structure_lat: {
        type: DOUBLE,
      },
      remark: {
        type: STRING,
      },
      inactive: {
        type: BOOLEAN,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return StructuresView;
};
