module.exports = (sequelize, DataTypes) => {
    const SourcesView = sequelize.define("list_sources",
      {
        source_ndx: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        source_desc: {
          type: DataTypes.STRING,
        },
        remark: {
          type: DataTypes.STRING,
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