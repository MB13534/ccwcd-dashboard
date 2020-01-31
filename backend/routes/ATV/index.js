const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");

const {
  ATV_Structure_Types,
  ATV_Structures,
  ATV_Measurement_Types,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/atv/structure-types
// Route for returning all structure types
router.get("/structure-types", (req, res, next) => {
  ATV_Structure_Types.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/atv/structures
// Route for returning all structures
router.get("/structures", (req, res, next) => {
  ATV_Structures.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

// GET /api/atv/measurement-types
// Route for returning all measurement types
router.get("/measurement-types", (req, res, next) => {
  ATV_Measurement_Types.findAll()
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      next(err);
    });
});

module.exports = router;
