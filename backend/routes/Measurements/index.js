const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const {
  ListMeasurementStations,
  AlertListMeasurementStations,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/measurements
// Route for returning all measurements
router.get(
  "/",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListMeasurementStations.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/measurements/alerts
// Route for returning all measurements related to alerts
router.get(
  "/alerts",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    AlertListMeasurementStations.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/measurements/:id
// Route for retrieving a single measurement
router.get(
  "/:id",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListMeasurementStations.findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// POST /api/measurements
// Route for creating a new measurement
router.post(
  "/",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListMeasurementStations.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// PUT /api/measurements/:id
// Route for updating an existing measurement
router.put(
  "/:id",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
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
  }
);

module.exports = router;
