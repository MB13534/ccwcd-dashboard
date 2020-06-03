const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const { AlertsRequestsConfig } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/alerts
// Route for returning all alerts
router.get(
  "/",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    AlertsRequestsConfig.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/alerts/:id
// Route for retrieving a single alert
router.get(
  "/:id",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    AlertsRequestsConfig.findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// POST /api/alerts
// Route for creating a new alert
router.post(
  "/",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    AlertsRequestsConfig.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// PUT /api/alerts/:id
// Route for updating an existing alert
router.put(
  "/:id",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    AlertsRequestsConfig.update(req.body, {
      where: {
        alert_request_ndx: req.params.id,
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
