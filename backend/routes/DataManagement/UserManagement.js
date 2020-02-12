const express = require("express");
const axios = require("axios");
const {
  checkAccessToken,
  checkPermission,
  getAuth0APIToken,
} = require("../../middleware/auth.js");

const { Users, UsersLanding, UserRolesLanding } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

/**
 * This function is used to retrieve the roles associated
 * with each user
 * It returns a new object for each user with the user roles
 * appended to the original object
 * @param {array} users
 * * @param {string} access_token
 */
async function getUserRoles(users, access_token) {
  const usersWithRoles = users.map(async user => {
    const { user_id } = user;
    const rolesResponse = await axios.get(
      `${process.env.USER_MANAGEMENT_AUDIENCE}users/${user_id}/roles`,
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );
    const { data } = rolesResponse;
    const mergedUser = {
      ...user,
      roles: data.map(d => d.id),
    };
    return mergedUser;
  });
  const rolesPromises = await Promise.all(usersWithRoles);
  return rolesPromises;
}

/**
 * This function is used to retrieve a list of roles
 * @param {string} access_token
 */
async function getRoles(access_token) {
  const rolesResponse = await axios.get(
    `${process.env.USER_MANAGEMENT_AUDIENCE}roles`,
    {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    }
  );
  const { data } = rolesResponse;
  return data;
}

// GET /api/data-management/user-management/users
// Route for returning all users
router.get("/users", checkPermission(["read:users"]), (req, res, next) => {
  Users.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/data-management/user-management/users
// Route for writing all users from Auth0 to
router.post(
  "/auth0-sync",
  checkPermission(["read:users"]),
  async (req, res, next) => {
    try {
      const access_token = await getAuth0APIToken();
      const usersResponse = await axios.get(
        `${process.env.USER_MANAGEMENT_AUDIENCE}users`,
        {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        }
      );
      const users = usersResponse.data;
      const usersWithRoles = await getUserRoles(users, access_token);
      const roles = await getRoles(access_token);
      const formattedUsersData = usersWithRoles.map(user => {
        return {
          auth0_user_id: user.user_id,
          auth0_email: user.email,
          auth0_name: user.name,
          auth0_nickname: user.nickname,
          auth0_created_at: user.created_at,
          auth0_last_login: user.last_login,
          auth0_logins_count: user.logins_count,
          assigned_roles: user.roles,
        };
      });
      const formattedRolesData = roles.map(role => {
        return {
          auth0_role_id: role.id,
          auth0_role_name: role.name,
          auth0_role_description: role.description,
        };
      });
      const destroyUsers = await UsersLanding.destroy({ truncate: true });
      const createUsers = await UsersLanding.bulkCreate(formattedUsersData);
      const destroyRoles = await UserRolesLanding.destroy({ truncate: true });
      const createRoles = await UserRolesLanding.bulkCreate(formattedRolesData);
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;