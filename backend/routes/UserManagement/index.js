const express = require('express');
const axios = require('axios');
const { checkAccessToken, checkPermission, getAuth0APIToken } = require('../../middleware/auth.js');

const { Users, UsersLanding, UserRolesLanding, UserStructuresAssoc, ATV_Structures } = require('../../models');

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
  // Returns a Promise that resolves after "ms" Milliseconds
  function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  let usersWithRoles = [];
  for (let user of users) {
    await timer(501);
    const { user_id } = user;
    const rolesResponse = await axios.get(`${process.env.USER_MANAGEMENT_AUDIENCE}users/${user_id}/roles`, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });
    const { data } = rolesResponse;
    const mergedUser = {
      ...user,
      roles: data.map(d => d.id),
    };
    usersWithRoles.push(mergedUser);
  }
  const rolesPromises = await Promise.all(usersWithRoles);
  return rolesPromises;
}

/**
 * This function is used to retrieve a list of roles
 * @param {string} access_token
 */
async function getRoles(access_token) {
  const rolesResponse = await axios.get(`${process.env.USER_MANAGEMENT_AUDIENCE}roles`, {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
  const { data } = rolesResponse;
  return data;
}

// GET /api/user-management/users
// Route for returning all users
router.get('/users', checkPermission(['read:users']), (req, res, next) => {
  Users.findAll({
    order: [['auth0_email', 'asc']],
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/user-management/users/assoc/structures
// Route for returning all user to structure associations
router.get('/users/assoc/structures', checkPermission(['read:users']), (req, res, next) => {
  UserStructuresAssoc.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/user-management/structures/assoc/users
// Route for returning all user to structure associations
router.get('/structures/assoc/users', checkPermission(['read:users']), (req, res, next) => {
  ATV_Structures.findAll({
    attributes: ['structure_ndx', 'structure_desc', 'assoc_users'],
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// post /api/user-management/users/assoc/structures
// Route for updating/adding structure associations for a user
router.post('/users/assoc/structures', checkPermission(['read:users', 'write:users']), (req, res, next) => {
  UserStructuresAssoc.upsert(req.body)
    .then(data => {
      res.sendStatus(204);
    })
    .catch(err => {
      next(err);
    });
});

// post /api/user-management/users/assoc/structures
// Route for updating/adding structure associations for a user
router.post('/structures/assoc/users', checkPermission(['read:users', 'write:users']), async (req, res, next) => {
  try {
    await req.body.associations.forEach(assoc => {
      return UserStructuresAssoc.upsert(assoc);
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// POST /api/user-management/users
// Route for writing all users from Auth0 to
router.post('/auth0-sync', checkPermission(['read:users', 'write:users']), async (req, res, next) => {
  try {
    const access_token = await getAuth0APIToken();
    const usersResponse = await axios.get(`${process.env.USER_MANAGEMENT_AUDIENCE}users`, {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

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
    await UsersLanding.destroy({ truncate: true });
    await UsersLanding.bulkCreate(formattedUsersData);
    await UserRolesLanding.destroy({ truncate: true });
    await UserRolesLanding.bulkCreate(formattedRolesData);
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
