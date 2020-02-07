const express = require("express");
const { checkAccessToken } = require("../middleware/auth.js");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Reports } = require("../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/reports
// Route for returning all reports
router.get("/", (req, res, next) => {
  Reports.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
