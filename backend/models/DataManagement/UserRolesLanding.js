module.exports = (sequelize, DataTypes) => {
  const UserRolesLanding = sequelize.define(
    "list_user_roles_landing",
    {
      auth0_role_id: {
        type: DataTypes.STRING,
        primaryKey: true,
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
      schema: "web",
      freezeTableName: true,
    }
  );
  return UserRolesLanding;
};
