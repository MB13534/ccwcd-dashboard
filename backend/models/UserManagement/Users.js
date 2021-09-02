module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'users_list',
    {
      auth0_user_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      auth0_email: {
        type: DataTypes.STRING,
      },
      auth0_name: {
        type: DataTypes.STRING,
      },
      auth0_nickname: {
        type: DataTypes.STRING,
      },
      auth0_created_at: {
        type: DataTypes.STRING,
      },
      auth0_last_login: {
        type: DataTypes.STRING,
      },
      auth0_logins_count: {
        type: DataTypes.INTEGER,
      },
      assigned_roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
    },
    {
      timestamps: false,
      schema: 'web',
      freezeTableName: true,
    }
  );
  return Users;
};
