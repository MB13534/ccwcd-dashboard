const withInterval = require('sequelize-interval-postgres');

module.exports = (sequelize, SequelizeDataTypes) => {
  const { INTEGER, TEXT, DATE, BOOLEAN, INTERVAL } = withInterval(SequelizeDataTypes);
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
      local_file_name: {
        type: TEXT
      },
      dwr_station: {
        type: TEXT
      },
      dwr_metadata: {
        type: TEXT
      },
      retain_days: {
        type: INTEGER
      },
      history_days: {
        type: INTEGER
      },
      frequency: {
        type: INTERVAL
      },
      run_now: {
        type: BOOLEAN
      },
      tail_override: {
        type: BOOLEAN
      }
      
    },

    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListDataImports;
};
