const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { CWM_Meters, CWM_Wells } = require("../../models");

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

// GET /api/members-management/lists/meters
// Route for returning all meters
router.get("/meters", (req, res, next) => {
  CWM_Meters.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/members-management/lists/wells
// Route for returning all wells
router.get("/wells", (req, res, next) => {
  CWM_Wells.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
