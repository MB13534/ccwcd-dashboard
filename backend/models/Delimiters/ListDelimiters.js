module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListDelimiters = sequelize.define(
    "import_delimiters",
    {
      delimiter_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      delimiter_desc: {
        type: TEXT,
      },
      notes: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListDelimiters;
};
