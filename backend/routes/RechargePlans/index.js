const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const { ListRechargePlans } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/recharge-plans
// Route for returning all recharge plans
router.get(
  "/",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargePlans.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/recharge-plans/:id
// Route for retrieving a single recharge plan
router.get(
  "/:id",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargePlans.findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// POST /api/recharge-plans
// Route for creating a new recharge plan
router.post(
  "/",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListRechargePlans.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// PUT /api/recharge-plans/:id
// Route for updating an existing recharge plan
router.put(
  "/:id",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListRechargePlans.update(req.body, {
      where: {
        plan_ndx: req.params.id,
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
