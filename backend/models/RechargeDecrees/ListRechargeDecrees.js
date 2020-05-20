module.exports = (sequelize, DataTypes) => {
  const { TEXT, INTEGER } = DataTypes;
  const ListRechargeDecrees = sequelize.define(
    "list_recharge_decrees",
    {
      recharge_decree_ndx: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      recharge_decree_desc: {
        type: TEXT,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return ListRechargeDecrees;
};
