const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");

const { DM_Units } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/data-management/units
// Route for returning all units
router.get("/", (req, res, next) => {
  DM_Units.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/data-management/units/
// Route for returning all units
router.post("/", (req, res, next) => {
  // DM_Units.findAll()
  //   .then(data => {
  //     res.json(data);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

module.exports = router;
