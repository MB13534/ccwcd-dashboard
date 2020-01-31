const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");

const { DM_Sources } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/data-management/sources
// Route for returning all sources
router.get("/", (req, res, next) => {
  DM_Sources.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// POST /api/data-management/sources/
// Route for returning all sources
router.post("/", (req, res, next) => {
  // DM_Sources.findAll()
  //   .then(data => {
  //     res.json(data);
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
});

module.exports = router;