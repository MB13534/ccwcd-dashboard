const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const { ListMeasurementTypes } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(
  checkPermission(["read:database-management", "write:database-management"])
);

// GET /api/measurement-types
// Route for returning all measurement types
router.get("/", (req, res, next) => {
  ListMeasurementTypes.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/measurement-types/:id
// Route for retrieving a single measurement type
router.get("/:id", (req, res, next) => {
  ListMeasurementTypes.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// POST /api/measurement-types
// Route for creating a new measurement type
router.post("/", (req, res, next) => {
  ListMeasurementTypes.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT /api/measurement-types/:id
// Route for updating an existing measurement type
router.put("/:id", (req, res, next) => {
  ListMeasurementTypes.update(req.body, {
    where: {
      measure_type_ndx: req.params.id,
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
