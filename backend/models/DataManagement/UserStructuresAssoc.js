module.exports = (sequelize, DataTypes) => {
  const UserStructuresAssoc = sequelize.define(
    "assoc_users_to_structures",
    {
      auth0_user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      assoc_structure_ndx: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
    },
    {
      timestamps: false,
      schema: "web",
      freezeTableName: true,
    }
  );
  return UserStructuresAssoc;
};
