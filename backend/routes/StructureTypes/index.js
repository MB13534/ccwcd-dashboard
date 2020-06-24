const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const {
  ListStructureTypes,
  ListRechargeStructureTypes,
} = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// GET /api/structure-types
// Route for returning all structure types
router.get(
  "/",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListStructureTypes.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/structure-types/recharge
// Route for returning all recharge structure types
router.get(
  "/recharge",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListRechargeStructureTypes.findAll()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// GET /api/structure-types/:id
// Route for retrieving a single structure type
router.get(
  "/:id",
  checkPermission(["read:database-management"]),
  (req, res, next) => {
    ListStructureTypes.findByPk(req.params.id)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// POST /api/structure-types
// Route for creating a new structure type
router.post(
  "/",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
    ListStructureTypes.create(req.body)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        next(err);
      });
  }
);

// PUT /api/structure-types/:id
// Route for updating an existing structure type
router.put(
  "/:id",
  checkPermission(["read:database-management", "write:database-management"]),
  (req, res, next) => {
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
  }
);

module.exports = router;
