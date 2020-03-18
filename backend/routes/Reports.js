const express = require("express");
const { checkAccessToken, checkPermission } = require("../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Reports } = require("../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(checkPermission(["read:reports", "write:reports"]));

// GET /api/reports
// Route for returning all reports
router.get("/", (req, res, next) => {
  const roles = req.user["https://ccwcd2.org/role_ids"];
  Reports.findAll({
    where: {
      assoc_role_id: {
        [Op.contains]: roles,
      },
    },
  })
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
