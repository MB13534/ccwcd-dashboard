module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT, DATE, BOOLEAN } = DataTypes;
  const ListDataImports = sequelize.define(
    "import_data_sources",
    {
      data_source_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      station_ndx: {
        type: INTEGER,
      },
      enabled: {
        type: BOOLEAN,
      },
      last_retreival: {
        type: DATE,
      },
      next_retreival: {
        type: DATE,
      },
      file_path: {
        type: TEXT,
      },
      file_name: {
        type: TEXT,
      },
      file_fieldcount: {
        type: INTEGER,
      },
      file_header_rowcount: {
        type: INTEGER,
      },
      delimiter_ndx: {
        type: INTEGER,
      },
      column_position_date: {
        type: INTEGER,
      },
      column_position_value: {
        type: INTEGER,
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
  return ListDataImports;
};
