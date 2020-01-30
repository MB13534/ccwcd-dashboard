const express = require("express");
const { checkAccessToken } = require("../middleware/auth.js");

const { StructureTypesView } = require("../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/structure-types
// Route for returning all structure types
router.get("/", (req, res, next) => {
  StructureTypesView.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
