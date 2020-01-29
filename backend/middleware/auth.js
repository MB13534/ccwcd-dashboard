const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const axios = require("axios");

function checkAccessToken(issuer, audience) {
  return jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${issuer}/.well-known/jwks.json`,
    }),

    // Validate the audience and the issuer.
    audience: audience,
    issuer: `https://${issuer}/`,
    algorithms: ["RS256"],
  });
}

function checkPermission(providedPermissions) {
  return (req, res, next) => {
    const { permissions } = req.user;
    const permissionsArray = providedPermissions.map(permission => {
      if (permissions.includes(permission)) {
        return true;
      }
      return false;
    });
    if (!permissionsArray.includes(false)) return next();
    res.status(403).send();
  };
}

async function getAuth0APIToken() {
  const getTokenHeader = { "content-type": "application/json" };
  const getTokenBody = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    audience: process.env.USER_MANAGEMENT_AUDIENCE,
    grant_type: "client_credentials",
  };

  try {
    const tokenResponse = await axios.post(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      { headers: getTokenHeader },
      { data: getTokenBody }
    );
    const { access_token } = tokenResponse.data;
    return access_token;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  checkAccessToken,
  checkPermission,
  getAuth0APIToken,
};
