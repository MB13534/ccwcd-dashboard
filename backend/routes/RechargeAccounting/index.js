const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { crosstab, setAPIDate } = require("../../util");
const { RCH_FlagsReport } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
// router.use(checkPermission(["read:all-things-viewer"]));

// GET /api/recharge-accounting/flags
// Route for returning recharge accounting flags
router.get("/flags", (req, res, next) => {
  RCH_FlagsReport.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
