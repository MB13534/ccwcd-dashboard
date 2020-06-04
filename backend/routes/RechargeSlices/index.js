const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const { ListRechargeSlices } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/recharge-slices
// Route for returning all recharge slices
router.get(
  "/",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargeSlices.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/recharge-slices/:id
// Route for retrieving a single recharge slice
router.get(
  "/:id",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargeSlices.findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// POST /api/recharge-slices
// Route for creating a new recharge slice
router.post(
  "/",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListRechargeSlices.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// PUT /api/recharge-slices/:id
// Route for updating an existing recharge slice
router.put(
  "/:id",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListRechargeSlices.update(req.body, {
      where: {
        recharge_slice_ndx: req.params.id,
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