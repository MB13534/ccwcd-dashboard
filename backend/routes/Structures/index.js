const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const { ListStructures, RechargeListStructures } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/structures
// Route for returning all structures
router.get(
  "/",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListStructures.findAll({
      order: [["structure_desc", "ASC"]],
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/structures/recharge
// Route for returning all structures associated with recharge accounting
router.get(
  "/recharge",
  checkPermission(["monthly-unlagged-recharge", "read:recharge-accounting"]),
  (req, res, next) => {
    RechargeListStructures.findAll({
      attributes: ["structure_ndx", "structure_desc"],
    })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/structures/:id
// Route for retrieving a single structure
router.get(
  "/:id",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListStructures.findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// POST /api/structures
// Route for creating a new structure
router.post(
  "/",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListStructures.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// PUT /api/structures/:id
// Route for updating an existing structure
router.put(
  "/:id",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListStructures.update(req.body, {
      where: {
        structure_ndx: req.params.id,
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
