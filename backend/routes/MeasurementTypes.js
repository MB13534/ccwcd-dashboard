const express = require("express");
const { checkAccessToken } = require("../middleware/auth.js");

const { MeasurementTypesView } = require("../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/measurement-types
// Route for returning all measurement types
router.get("/", (req, res, next) => {
  MeasurementTypesView.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
