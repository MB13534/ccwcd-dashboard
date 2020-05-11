const express = require("express");
const { checkAccessToken } = require("../../middleware/auth.js");

const { DM_Structures } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/data-management/structures
// Route for returning all structures
// a structure type
router.get("/", (req, res, next) => {
  DM_Structures.findAll({
    order: [["structure_desc", "asc"]],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/data-management/structures/:structureType
// Route for returning all structures associated with
// a structure type
router.get("/:structureType", (req, res, next) => {
  DM_Structures.findAll({
    where: {
      structure_type_ndx: req.params.structureType,
    },
    order: [["structure_desc", "asc"]],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
