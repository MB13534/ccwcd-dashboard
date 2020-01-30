const express = require("express");
const { checkAccessToken } = require("../middleware/auth.js");

const { StructuresView } = require("../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/structures
// Route for returning all structures
router.get("/", (req, res, next) => {
  StructuresView.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
