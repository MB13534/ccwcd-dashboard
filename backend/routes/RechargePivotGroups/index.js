const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const { ListRechargePivotGroups } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/recharge-pivot-groups
// Route for returning all recharge pivot groups
router.get(
  "/",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargePivotGroups.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/recharge-pivot-groups/:id
// Route for retrieving a single recharge pivot group
router.get(
  "/:id",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargePivotGroups.findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// POST /api/recharge-pivot-groups
// Route for creating a new recharge pivot group
router.post(
  "/",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListRechargePivotGroups.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// PUT /api/recharge-pivot-groups/:id
// Route for updating an existing recharge pivot group
router.put(
  "/:id",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListRechargePivotGroups.update(req.body, {
      where: {
        recharge_pivot_group_ndx: req.params.id,
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
