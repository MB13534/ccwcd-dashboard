module.exports = (sequelize, DataTypes) => {
  const UserRoles = sequelize.define(
    "list_user_roles",
    {
      auth0_role_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true,
      },
      auth0_role_name: {
        type: DataTypes.STRING,
      },
      auth0_role_description: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      schema: "data",
      freezeTableName: true,
    }
  );
  return UserRoles;
};
