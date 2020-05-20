const express = require("express");
const {
  checkAccessToken,
  checkPermission,
} = require("../../middleware/auth.js");
const { ListSources } = require("../../models");

// Create Express Router
const router = express.Router();

// Attach middleware to ensure that user is authenticated
router.use(checkAccessToken(process.env.AUTH0_DOMAIN, process.env.AUDIENCE));

// Attach middleware to ensure that the user has the proper permissions
router.use(
  checkPermission(["read:database-management", "write:database-management"])
);

// GET /api/sources
// Route for returning all sources
router.get("/", (req, res, next) => {
  ListSources.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// GET /api/sources/:id
// Route for retrieving a single source
router.get("/:id", (req, res, next) => {
  ListSources.findByPk(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// POST /api/sources
// Route for creating a new source
router.post("/", (req, res, next) => {
  ListSources.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      next(err);
    });
});

// PUT /api/sources/:id
// Route for updating an existing source
router.put("/:id", (req, res, next) => {
  ListSources.update(req.body, {
    where: {
      source_ndx: req.params.id,
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
