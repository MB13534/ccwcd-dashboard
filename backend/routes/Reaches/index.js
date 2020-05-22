const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const { ListReaches } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(
  checkPermission(["read:database-management", "write:database-management"])
);

// GET /api/reaches
// Route for returning all reaches
router.get("/", (req, res, next) => {
  ListReaches.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/reaches/:id
// Route for retrieving a single reach
router.get("/:id", (req, res, next) => {
  ListReaches.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// POST /api/reaches
// Route for creating a new reach
router.post("/", (req, res, next) => {
  ListReaches.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT /api/reaches/:id
// Route for updating an existing reach
router.put("/:id", (req, res, next) => {
  ListReaches.update(req.body, {
    where: {
      reach_index: req.params.id,
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
