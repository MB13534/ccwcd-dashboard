const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const {
  WellAttributes,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(
  checkPermission([
    "read:members-data-management",
    "write:members-data-management",
  ])
);

// GET /api/members-management/well-attributes
// Route for returning daily data averages
router.get("/", (req, res, next) => {
  WellAttributes.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// PUT /api/members-management/well-attributes
// Route for returning modified values
router.put("/", (req, res, next) => {
  WellAttributes.update(req.body, {
    where: {
      well_index: req.body.well_index,
    },
  })
    .then(data => {
      res.sendStatus(200);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
