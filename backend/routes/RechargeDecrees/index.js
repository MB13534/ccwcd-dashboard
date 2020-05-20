const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const Sequelize = require("sequelize");
const { ListRechargeDecrees } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(
  checkPermission(["read:database-management", "write:database-management"])
);

// GET /api/recharge-decrees
// Route for returning all recharge decrees
router.get("/", (req, res, next) => {
  ListRechargeDecrees.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/recharge-decrees/:id
// Route for retrieving a single recharge decree
router.get("/:id", (req, res, next) => {
  ListRechargeDecrees.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// POST /api/recharge-decrees
// Route for creating a new recharge decree
router.post("/", (req, res, next) => {
  ListRechargeDecrees.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT /api/recharge-decrees/:id
// Route for updating an existing recharge decree
router.put("/:id", (req, res, next) => {
  ListRechargeDecrees.update(req.body, {
    where: {
      recharge_decree_ndx: req.params.id,
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
