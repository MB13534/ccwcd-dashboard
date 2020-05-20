const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const { ListStructureTypes } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(
  checkPermission(["read:database-management", "write:database-management"])
);

// GET /api/structure-types
// Route for returning all structure types
router.get("/", (req, res, next) => {
  ListStructureTypes.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/structure-types/:id
// Route for retrieving a single structure type
router.get("/:id", (req, res, next) => {
  ListStructureTypes.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// POST /api/structure-types
// Route for creating a new structure type
router.post("/", (req, res, next) => {
  ListStructureTypes.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT /api/structure-types/:id
// Route for updating an existing structure type
router.put("/:id", (req, res, next) => {
  ListStructureTypes.update(req.body, {
    where: {
      structure_type_ndx: req.params.id,
    },
    returning: true,
  })
    .then((data) => {
      res.json(data[1][0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
