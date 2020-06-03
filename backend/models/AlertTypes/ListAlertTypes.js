module.exports = (sequelize, DataTypes) => {
  const { INTEGER, TEXT } = DataTypes;
  const ListAlertTypes = sequelize.define(
    "list_alert_types",
    {
      alert_type_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      alert_type_desc: {
        type: TEXT,
      },
      sub_function_desc: {
        type: TEXT,
      },
      remark: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "alert",
      freezeTableName: true,
    }
  );
  return ListAlertTypes;
};
