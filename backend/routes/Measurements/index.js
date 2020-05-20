const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const { ListMeasurementStations } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(
  checkPermission(["read:database-management", "write:database-management"])
);

// GET /api/measurements
// Route for returning all measurements
router.get("/", (req, res, next) => {
  ListMeasurementStations.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/measurements/:id
// Route for retrieving a single measurement
router.get("/:id", (req, res, next) => {
  ListMeasurementStations.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// POST /api/measurements
// Route for creating a new measurement
router.post("/", (req, res, next) => {
  ListMeasurementStations.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT /api/measurements/:id
// Route for updating an existing measurement
router.put("/:id", (req, res, next) => {
  ListMeasurementStations.update(req.body, {
    where: {
      station_ndx: req.params.id,
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
