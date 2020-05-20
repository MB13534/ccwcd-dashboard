module.exports = (sequelize, DataTypes) => {
  const { TEXT, INTEGER } = DataTypes;
  const SourcesView = sequelize.define(
    "list_sources",
    {
      source_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      source_desc: {
        type: TEXT,
      },
      remark: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return SourcesView;
};
